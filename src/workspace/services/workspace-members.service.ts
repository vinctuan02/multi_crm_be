import { Injectable } from '@nestjs/common';
import { TypeID } from 'src/common/typeorm/enum/db-type.enum';
import { InviteUserToWorkspaceDto } from 'src/user-workspace/dto/user-workspace.dto';
import { WorkspaceRole } from 'src/user-workspace/enums/user-workspace.enum';
import { UserWorkspaceService } from 'src/user-workspace/services/user-workspace.service';

@Injectable()
export class WorkspaceMembersService {
	constructor(private readonly userWorkspaceService: UserWorkspaceService) {}

	async inviteUser(data: InviteUserToWorkspaceDto) {
		await this.userWorkspaceService.inviteUser(data);
	}

	async acceptInvite(data: { workspaceId: TypeID; userId: TypeID }) {
		return await this.userWorkspaceService.acceptInvite(data);
	}

	async updateUserRole(data: {
		workspaceId: TypeID;
		userId: TypeID;
		role: WorkspaceRole;
	}) {
		return await this.userWorkspaceService.updateUserRole(data);
	}

	async getMembers(workspaceId: TypeID) {
		return await this.userWorkspaceService.getMembers(workspaceId);
	}
}
