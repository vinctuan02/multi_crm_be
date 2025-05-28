import { SetMetadata } from '@nestjs/common';
import { WorkspaceRole } from 'src/user-workspace/enums/user-workspace.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: WorkspaceRole[]) =>
	SetMetadata(ROLES_KEY, roles);
