import { IsEnum, IsNotEmpty } from 'class-validator';
import { TypeID } from 'src/common/typeorm/enum/db-type.enum';
import { WorkspaceRole } from '../enums/user-workspace.enum';

export class CreateUserWorkspaceDto {
	@IsNotEmpty()
	userId: TypeID;

	@IsNotEmpty()
	workspaceId: TypeID;

	@IsNotEmpty()
	@IsEnum(WorkspaceRole)
	role: WorkspaceRole;
}
