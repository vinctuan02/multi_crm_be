import { Injectable } from '@nestjs/common';
import { TypeID } from 'src/common/typeorm/enum/db-type.enum';
import { InviteUserToWorkspaceDto } from 'src/user-workspace/dto/user-workspace.dto';
import { UserWorkspaceService } from 'src/user-workspace/services/user-workspace.service';

@Injectable()
export class WorkspaceMembersService {
	constructor(private readonly userWorkspaceService: UserWorkspaceService) {}

	async inviteUser(data: InviteUserToWorkspaceDto) {
		await this.userWorkspaceService.inviteUser(data);
	}

	async getMembers(workspaceId: TypeID) {
		await this.userWorkspaceService.getMembers(workspaceId);
	}
}
