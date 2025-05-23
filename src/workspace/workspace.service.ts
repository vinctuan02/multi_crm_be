import {
	ForbiddenException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeID } from 'src/common/typeorm/enum/db-type.enum';
import { ValidateService } from 'src/helper/services/validate.service';
import { JwtUser } from 'src/jwt/interfaces/jwt.interface';
import { UserWorkspace } from 'src/user-workspace/entities/user-workspace.entity';
import { WorkspaceRole } from 'src/user-workspace/enums/user-workspace.enum';
import { UserWorkspaceService } from 'src/user-workspace/user-workspace.service';
import { Repository } from 'typeorm';
import { CreateWorkspaceDto, UpdateWorkspaceDto } from './dto/workspace.dto';
import { Workspace } from './entities/workspace.entity';

@Injectable()
export class WorkspaceService {
	constructor(
		@InjectRepository(Workspace)
		private readonly workspaceRepo: Repository<Workspace>,

		@InjectRepository(UserWorkspace)
		private readonly userWorkspaceRepo: Repository<UserWorkspace>,

		private readonly userWorkspaceService: UserWorkspaceService,

		private readonly validateService: ValidateService,
	) {}

	async createWorkspace(payload: CreateWorkspaceDto, user: JwtUser) {
		const { name, subdomain } = payload;

		await this.validateService.validateUnique({
			repo: this.workspaceRepo,
			where: [{ subdomain }],
			message: 'Subdomain already exists',
		});

		const workspace = this.workspaceRepo.create({ name, subdomain });
		await this.workspaceRepo.save(workspace);

		const userWorkspace = this.userWorkspaceRepo.create({
			user: { id: user.id },
			workspace: { id: workspace.id },
			role: WorkspaceRole.ADMIN,
		});

		await this.userWorkspaceRepo.save(userWorkspace);

		return workspace;
	}

	async updateWorkspace(
		id: TypeID,
		payload: UpdateWorkspaceDto,
		user: JwtUser,
	): Promise<Workspace> {
		const { subdomain } = payload;

		const workspace = await this.workspaceRepo.findOne({
			where: { id },
		});

		if (!workspace) {
			throw new NotFoundException('Workspace not found');
		}

		const role = await this.userWorkspaceService.getUserRole({
			workspaceId: id,
			userId: user.id,
		});

		if (role !== WorkspaceRole.ADMIN) {
			throw new ForbiddenException('You are not admin of this workspace');
		}

		if (subdomain && subdomain !== workspace.subdomain) {
			await this.validateService.validateUnique({
				repo: this.workspaceRepo,
				where: [{ subdomain }],
				message: 'Subdomain already exists',
			});
		}

		await this.workspaceRepo.update(id, payload);
		return this.workspaceRepo.findOne({ where: { id } });
	}

	async findBySubdomain(subdomain: string): Promise<Workspace | null> {
		return this.workspaceRepo.findOne({ where: { subdomain } });
	}

	async getUserRoleInWorkspace(
		userId: TypeID,
		workspaceId: TypeID,
	): Promise<WorkspaceRole> {
		return this.userWorkspaceService.getUserRole({ userId, workspaceId });
	}
}
