import { Body, Controller, Param, Patch, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { ResponseSuccessDto } from 'src/common/dto/response.dto';
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
	) {
		const user = req.user as JwtUser;
		return this.workspaceService.updateWorkspace(id, body, user);
	}

	// @Get('meta')
	// async getMetadata(@Req() req: Request) {
	// 	const workspace = (req as any).workspace;
	// 	const user = req.user as any;

	// 	const role = await this.workspaceService.getUserRoleInWorkspace(
	// 		user.id,
	// 		workspace.id,
	// 	);

	// 	return {
	// 		id: workspace.id,
	// 		name: workspace.name,
	// 		subdomain: workspace.subdomain,
	// 		logoUrl: workspace.logoUrl,
	// 		role,
	// 	};
	// }
}
