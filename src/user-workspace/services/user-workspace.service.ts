import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeID } from 'src/common/typeorm/enum/db-type.enum';
import { ValidateService } from 'src/helper/services/validate.service';
import { JwtUser } from 'src/jwt/interfaces/jwt.interface';
import { NotificationService } from 'src/notification/services/notification.service';
import { User } from 'src/user/entities/user.entity';
import { UserFieldQueryEnum } from 'src/user/enum/user.field-query.enum';
import { UserService } from 'src/user/services/user.service';
import { Workspace } from 'src/workspace/entities/workspace.entity';
import { Repository } from 'typeorm';
import {
	CreateUserWorkspaceDto,
	InviteUserToWorkspaceDto,
} from '../dto/user-workspace.dto';
import { UserWorkspace } from '../entities/user-workspace.entity';
import { WorkspaceRole } from '../enums/user-workspace.enum';

@Injectable()
export class UserWorkspaceService {
	constructor(
		@InjectRepository(UserWorkspace)
		private readonly userWorkspaceRepository: Repository<UserWorkspace>,

		@InjectRepository(User)
		private readonly userRepository: Repository<User>,

		@InjectRepository(Workspace)
		private readonly workspaceRepository: Repository<Workspace>,

		private readonly validateService: ValidateService,
		private readonly notificationService: NotificationService,

		private readonly userService: UserService,
	) {}

	async create(payload: CreateUserWorkspaceDto, user: JwtUser) {
		const { userId, workspaceId } = payload;

		await this.validateService.validateManyExists([
			{
				repo: this.userRepository,
				id: userId,
				message: 'User not found',
			},
			{
				repo: this.workspaceRepository,
				id: workspaceId,
				message: 'Workspace not found',
			},
		]);

		await this.validateService.validateUnique({
			repo: this.userWorkspaceRepository,
			where: [{ userId, workspaceId }],
		});

		const newUserWorkspace = this.userWorkspaceRepository.create(payload);

		return await this.userWorkspaceRepository.save(newUserWorkspace);
	}

	async getUserRole(data: {
		workspaceId: TypeID;
		userId: TypeID;
	}): Promise<WorkspaceRole> {
		const { workspaceId, userId } = data;

		const userWorkspace = await this.userWorkspaceRepository.findOne({
			where: { workspaceId, userId },
		});

		if (!userWorkspace) {
			throw new NotFoundException('User Workspace not found');
		}

		return userWorkspace.role;
	}

	async inviteUser(data: InviteUserToWorkspaceDto) {
		const { workspaceId, invitedUserId } = data;

		const userWorkspace = await this.userWorkspaceRepository
			.createQueryBuilder('userWorkspace')
			.leftJoinAndSelect('userWorkspace.workspace', 'workspace')
			.where('workspace.id = :workspaceId', { workspaceId })
			.getOne();

		const workspace = userWorkspace.workspace;

		if (!userWorkspace || !userWorkspace.workspace) {
			throw new NotFoundException('Workspace not found');
		}

		console.log(workspace);

		const invitedUser = await this.userService.getDetailUser({
			fieldName: UserFieldQueryEnum.EMAIL,
			value: invitedUserId,
		});

		this.notificationService.sendEmailNotification({
			to: invitedUser.email,
			subject: 'Email invite workspace',
			html: 'adsg',
		});
	}

	async acceptInvite(workspaceId: TypeID, userId: TypeID) {
		// Logic user chấp nhận lời mời, update trạng thái thành accepted
	}

	async updateUserRole(
		workspaceId: TypeID,
		userId: TypeID,
		role: 'admin' | 'member',
	) {
		// Logic cập nhật role
	}

	async getMembers(workspaceId: TypeID) {
		// Trả về danh sách thành viên workspace
		return this.userWorkspaceRepository.find({ where: { workspaceId } });
	}

	async isUserInWorkspace(
		userId: TypeID,
		workspaceId: TypeID,
	): Promise<boolean> {
		const count = await this.userWorkspaceRepository.count({
			where: { userId, workspaceId },
		});
		return count > 0;
	}
}
