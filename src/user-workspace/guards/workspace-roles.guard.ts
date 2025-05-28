// import {
// 	CanActivate,
// 	ExecutionContext,
// 	ForbiddenException,
// 	Injectable,
// } from '@nestjs/common';
// import { UserWorkspaceService } from '../services/user-workspace.service';

// @Injectable()
// export class WorkspaceRolesGuard implements CanActivate {
// 	private allowedRoles: string[] = [];

// 	constructor(private readonly userWorkspaceService: UserWorkspaceService) {}

// 	setAllowedRoles(roles: string[]) {
// 		this.allowedRoles = roles;
// 		return this;
// 	}

// 	async canActivate(context: ExecutionContext): Promise<boolean> {
// 		const req = context.switchToHttp().getRequest();
// 		const user = req.user;
// 		const workspaceId = req.workspaceId;

// 		if (!user) throw new ForbiddenException('User not authenticated');
// 		if (!workspaceId)
// 			throw new ForbiddenException('Workspace not identified');

// 		const role = await this.userWorkspaceService.getUserRole({
// 			userId: user.id,
// 			workspaceId,
// 		});

// 		if (!role || !this.allowedRoles.includes(role)) {
// 			throw new ForbiddenException('Permission denied');
// 		}
// 		return true;
// 	}
// }
