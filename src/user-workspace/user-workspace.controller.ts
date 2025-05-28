import { Controller } from '@nestjs/common';
import { UserWorkspaceService } from './services/user-workspace.service';

@Controller('user-workspace')
export class UserWorkspaceController {
	constructor(private readonly userWorkspaceService: UserWorkspaceService) {}

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
