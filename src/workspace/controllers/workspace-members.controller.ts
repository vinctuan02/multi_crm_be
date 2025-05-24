// src/workspace/workspace-members.controller.ts
import {
	Body,
	Controller,
	ForbiddenException,
	Param,
	Post,
	Req,
} from '@nestjs/common';
import { ResponseSuccessDto } from 'src/common/dto/response.dto';

import { CustomRequest } from 'src/common/inteface/custom-request.interface';
import { TypeID } from 'src/common/typeorm/enum/db-type.enum';
import { WorkspaceRole } from 'src/user-workspace/enums/user-workspace.enum';
import { WorkspaceMembersService } from '../services/workspace-members.service';
import { WorkspaceService } from '../services/workspace.service';

@Controller('workspaces/:workspaceId/members')
export class WorkspaceMembersController {
	constructor(
		private readonly workspaceMembersService: WorkspaceMembersService,
		private readonly workspaceService: WorkspaceService,
	) {}

	@Post('invite')
	async inviteUser(
		@Param('workspaceId') workspaceId: TypeID,
		@Body('invitedUserId') invitedUserId: TypeID,
		@Req() req: CustomRequest,
	) {
		const user = req.user;

		const role = await this.workspaceService.getUserRoleInWorkspace({
			userId: user.id,
			workspaceId,
		});

		if (role !== WorkspaceRole.ADMIN) {
			throw new ForbiddenException('You are not admin of this workspace');
		}

		const invite = await this.workspaceMembersService.inviteUser({
			invitedUserId,
			workspaceId,
		});
		return new ResponseSuccessDto({ data: invite });
	}

	// @Post('invite/accept')
	// async acceptInvite(@Param('workspaceId') workspaceId: TypeID, @Req() req) {
	// 	const userId = req.user.id;
	// 	await this.userWorkspaceService.acceptInvite(workspaceId, userId);
	// 	return new ResponseSuccessDto({ message: 'Invite accepted' });
	// }

	// @Patch(':userId/role')
	// async updateUserRole(
	// 	@Param('workspaceId') workspaceId: TypeID,
	// 	@Param('userId') userId: TypeID,
	// 	@Body('role') role: 'admin' | 'member',
	// 	@Req() req,
	// ) {
	// 	// Check quyền admin ở đây
	// 	await this.userWorkspaceService.updateUserRole(
	// 		workspaceId,
	// 		userId,
	// 		role,
	// 	);
	// 	return new ResponseSuccessDto({ message: 'Role updated' });
	// }

	// @Get()
	// async getMembers(@Param('workspaceId') workspaceId: TypeID, @Req() req) {
	// 	const members = await this.userWorkspaceService.getMembers(workspaceId);
	// 	return new ResponseSuccessDto({ data: members });
	// }
}
