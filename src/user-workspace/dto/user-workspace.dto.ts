import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TypeID } from 'src/common/typeorm/enum/db-type.enum';
import { InvitationStatus, WorkspaceRole } from '../enums/user-workspace.enum';

export class CreateUserWorkspaceDto {
	@IsNotEmpty()
	userId: TypeID;

	@IsNotEmpty()
	workspaceId: TypeID;

	@IsOptional()
	@IsEnum(WorkspaceRole)
	role?: WorkspaceRole = WorkspaceRole.MEMBER;

	@IsEnum(InvitationStatus)
	@IsOptional()
	invitationStatus?: InvitationStatus = InvitationStatus.INVITED;
}

export class InviteUserToWorkspaceDto {
	workspaceId: TypeID;
	invitedUserId: TypeID;
	inviterUserId: TypeID;
}
