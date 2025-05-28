// import { applyDecorators, Injectable, UseGuards } from '@nestjs/common';
// import { UserWorkspaceService } from '../services/user-workspace.service';
// import { WorkspaceRolesGuard } from './workspace-roles.guard';

// export function RolesGuard(roles: string[]) {
// 	return applyDecorators(UseGuards(CustomRolesGuardFactory(roles)));
// }

// function CustomRolesGuardFactory(roles: string[]) {
// 	@Injectable()
// 	class CustomRolesGuard extends WorkspaceRolesGuard {
// 		constructor(userWorkspaceService: UserWorkspaceService) {
// 			super(userWorkspaceService);
// 			this.setAllowedRoles(roles);
// 		}
// 	}
// 	return CustomRolesGuard;
// }
