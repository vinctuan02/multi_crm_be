import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeID } from 'src/common/typeorm/enum/db-type.enum';
import { ValidateService } from 'src/helper/services/validate.service';
import { JwtUser } from 'src/jwt/interfaces/jwt.interface';
import { User } from 'src/user/entities/user.entity';
import { Workspace } from 'src/workspace/entities/workspace.entity';
import { Repository } from 'typeorm';
import { CreateUserWorkspaceDto } from './dto/user-workspace.dto';
import { UserWorkspace } from './entities/user-workspace.entity';
import { WorkspaceRole } from './enums/user-workspace.enum';

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
}
