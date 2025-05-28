import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserWorkspaceService } from 'src/user-workspace/services/user-workspace.service';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { CustomRequest } from '../interface/custom-request.interface';

@Injectable()
export class WorkspaceRolesGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly userWorkspaceService: UserWorkspaceService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		]);

		console.log(roles);

		if (!roles || roles.length === 0) {
			return true;
		}

		const req: CustomRequest = context.switchToHttp().getRequest();
		const user = req.user;
		const workspaceId = req.workspaceId;

		if (!user) throw new ForbiddenException('User not authenticated');
		if (!workspaceId)
			throw new ForbiddenException('Workspace not identified');

		const role = await this.userWorkspaceService.getUserRole({
			userId: user.id,
			workspaceId,
		});

		if (!role || !roles.includes(role)) {
			throw new ForbiddenException('Permission denied');
		}

		return true;
	}
}
