import {
	Body,
	Controller,
	ForbiddenException,
	Get,
	Param,
	Patch,
	Post,
	Req,
	UnauthorizedException,
	UseGuards,
} from '@nestjs/common';
import { ResponseSuccessDto } from 'src/common/dto/response.dto';

import { Roles } from 'src/auth/decorators/roles.decorator';
import { WorkspaceRolesGuard } from 'src/auth/guards/workspace-roles.guard';
import { CustomRequest } from 'src/common/interface/custom-request.interface';
import { TypeID } from 'src/common/typeorm/enum/db-type.enum';
import { WorkspaceRole } from 'src/user-workspace/enums/user-workspace.enum';
import { WorkspaceMembersService } from '../services/workspace-members.service';
import { WorkspaceService } from '../services/workspace.service';

@UseGuards(WorkspaceRolesGuard)
@Controller('members')
export class WorkspaceMembersSubdomainController {
	constructor(
		private readonly workspaceMembersService: WorkspaceMembersService,
		private readonly workspaceService: WorkspaceService,
	) {}

	@Post('invite')
	@Roles(WorkspaceRole.ADMIN)
	async inviteUser(
		@Body('invitedUserId') invitedUserId: TypeID,
		@Req() req: CustomRequest,
	) {
		const user = req.user;
		const workspaceId = req.workspaceId;
		if (!user) throw new UnauthorizedException('User not authenticated');
		if (!workspaceId) throw new ForbiddenException('Workspace ID missing');

		const invite = await this.workspaceMembersService.inviteUser({
			inviterUserId: user.id,
			invitedUserId,
			workspaceId,
		});
		return new ResponseSuccessDto({ data: invite });
	}

	@Post('invite/accept')
	async acceptInvite(@Req() req: CustomRequest) {
		const user = req.user;
		const workspaceId = req.workspaceId;
		if (!user) throw new UnauthorizedException('User not authenticated');
		if (!workspaceId) throw new ForbiddenException('Workspace ID missing');

		const data = await this.workspaceMembersService.acceptInvite({
			workspaceId,
			userId: user.id,
		});
		return new ResponseSuccessDto({ message: 'Invite accepted', data });
	}

	@Patch(':userId/role')
	async updateUserRole(
		@Param('userId') userId: TypeID,
		@Body('role') role: WorkspaceRole,
		@Req() req: CustomRequest,
	) {
		const user = req.user;
		const workspaceId = req.workspaceId;
		if (!user) throw new UnauthorizedException('User not authenticated');
		if (!workspaceId) throw new ForbiddenException('Workspace ID missing');

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
	async getMembers(@Req() req: CustomRequest) {
		const user = req.user;
		const workspaceId = req.workspaceId;
		if (!user) throw new UnauthorizedException('User not authenticated');
		if (!workspaceId) throw new ForbiddenException('Workspace ID missing');

		const members =
			await this.workspaceMembersService.getMembers(workspaceId);
		return new ResponseSuccessDto({ data: members });
	}
}
