import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeID } from 'src/common/typeorm/enum/db-type.enum';
import { ValidateService } from 'src/helper/services/validate.service';
import { JwtUser } from 'src/jwt/interfaces/jwt.interface';
import { Repository } from 'typeorm';
import { CreateUserWorkspaceDto } from './dto/user-workspace.dto';
import { UserWorkspace } from './entities/user-workspace.entity';
import { WorkspaceRole } from './enums/user-workspace.enum';

@Injectable()
export class UserWorkspaceService {
	constructor(
		@InjectRepository(UserWorkspace)
		private readonly userWorkspaceRepository: Repository<UserWorkspace>,

		private readonly validateService: ValidateService,
	) {}

	async create(payload: CreateUserWorkspaceDto, user: JwtUser) {
		const { userId, workspaceId } = payload;
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
