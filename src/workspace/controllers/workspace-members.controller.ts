// src/workspace/workspace-members.controller.ts
import {
	Body,
	Controller,
	ForbiddenException,
	Get,
	Param,
	Patch,
	Post,
	Req,
} from '@nestjs/common';
import { ResponseSuccessDto } from 'src/common/dto/response.dto';

import { CustomRequest } from 'src/common/interface/custom-request.interface';
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
			inviterUserId: user.id,
			invitedUserId,
			workspaceId,
		});
		return new ResponseSuccessDto({ data: invite });
	}

	@Post('invite/accept')
	async acceptInvite(
		@Param('workspaceId') workspaceId: TypeID,
		@Req() req: CustomRequest,
	) {
		const user = req.user;
		const data = await this.workspaceMembersService.acceptInvite({
			workspaceId,
			userId: user.id,
		});
		return new ResponseSuccessDto({ message: 'Invite accepted', data });
	}

	@Patch(':userId/role')
	async updateUserRole(
		@Param('workspaceId') workspaceId: TypeID,
		@Param('userId') userId: TypeID,
		@Body('role') role: WorkspaceRole,
		@Req() req: CustomRequest,
	) {
		const user = req.user;

		const roleUser = await this.workspaceService.getUserRoleInWorkspace({
			userId: user.id,
			workspaceId,
		});

		if (roleUser !== WorkspaceRole.ADMIN) {
			throw new ForbiddenException('You are not admin of this workspace');
		}

		const data = await this.workspaceMembersService.updateUserRole({
			workspaceId,
			userId,
			role,
		});
		return new ResponseSuccessDto({ message: 'Role updated', data });
	}

	@Get()
	async getMembers(@Param('workspaceId') workspaceId: TypeID, @Req() req) {
		const members =
			await this.workspaceMembersService.getMembers(workspaceId);
		return new ResponseSuccessDto({ data: members });
	}
}
