import {
	Body,
	Controller,
	Get,
	NotFoundException,
	Param,
	Patch,
	Post,
	Req,
	UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { ResponseSuccessDto } from 'src/common/dto/response.dto';
import { CustomRequest } from 'src/common/inteface/custom-request.interface';
import { TypeID } from 'src/common/typeorm/enum/db-type.enum';
import { JwtUser } from 'src/jwt/interfaces/jwt.interface';
import { CreateWorkspaceDto, UpdateWorkspaceDto } from './dto/workspace.dto';
import { Workspace } from './entities/workspace.entity';
import { WorkspaceService } from './workspace.service';

@Controller('workspace')
export class WorkspaceController {
	constructor(private readonly workspaceService: WorkspaceService) {}

	@Post()
	async create(
		@Body() payload: CreateWorkspaceDto,
		@Req() req: Request,
	): Promise<ResponseSuccessDto<Workspace>> {
		const user = req.user as JwtUser;
		const result = await this.workspaceService.createWorkspace(
			payload,
			user,
		);

		return new ResponseSuccessDto({ data: result });
	}

	@Patch(':id')
	async update(
		@Param('id') id: TypeID,
		@Body() body: UpdateWorkspaceDto,
		@Req() req: Request,
	): Promise<ResponseSuccessDto<Workspace>> {
		const user = req.user as JwtUser;
		const result = await this.workspaceService.updateWorkspace(
			id,
			body,
			user,
		);

		return new ResponseSuccessDto({ data: result });
	}

	@Get('metadata')
	async getMetadata(
		@Req() req: CustomRequest,
	): Promise<ResponseSuccessDto<Partial<Workspace>>> {
		const workspace = req.workspace;
		const user = req.user;

		if (!user) {
			throw new UnauthorizedException('User not authenticated');
		}

		if (!workspace) {
			throw new NotFoundException('Workspace not found in request');
		}

		const role = await this.workspaceService.getUserRoleInWorkspace(
			user.id,
			workspace.id,
		);

		const result = {
			id: workspace.id,
			name: workspace.name,
			subdomain: workspace.subdomain,
			logoUrl: workspace.logoUrl,
			role,
		};

		return new ResponseSuccessDto({ data: result });
	}
}
