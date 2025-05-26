import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { ResponseSuccessDto } from 'src/common/dto/response.dto';
import { JwtUser } from 'src/jwt/interfaces/jwt.interface';
import { CreateUserWorkspaceDto } from './dto/user-workspace.dto';
import { UserWorkspace } from './entities/user-workspace.entity';
import { UserWorkspaceService } from './services/user-workspace.service';
import { CustomRequest } from 'src/common/inteface/custom-request.interface';

@Controller('user-workspace')
export class UserWorkspaceController {
	constructor(private readonly userWorkspaceService: UserWorkspaceService) { }

	// @Post()
	// async create(
	// 	@Body() payload: CreateUserWorkspaceDto,
	// 	@Req() req: CustomRequest,
	// ): Promise<ResponseSuccessDto<UserWorkspace>> {
	// 	const user = req.user
	// 	const result = await this.userWorkspaceService.create(payload, user);

	// 	return new ResponseSuccessDto({ data: result });
	// }
}
