import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ResponseSuccessDto } from 'src/common/dto/response.dto';
import { JwtUser } from 'src/jwt/interfaces/jwt.interface';
import { UserCreateDto } from 'src/user/dto/user.create.dto';
import { Public } from './decorators/auth.decorators';
import { AuthLoginDto } from './dto/auth.login.dto';
import { IToken } from './interfaces/auth.interface';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Public()
	@Post('register')
	async register(
		@Body() payload: UserCreateDto,
	): Promise<ResponseSuccessDto<IToken>> {
		const result = await this.authService.register(payload);
		return new ResponseSuccessDto({
			message: 'Register successfully',
			data: result,
		});
	}

	@Get('me')
	getProfile(@Req() req): ResponseSuccessDto<JwtUser> {
		return new ResponseSuccessDto({ data: req.user });
	}

	@Public()
	@Post('login')
	async login(
		@Body() payload: AuthLoginDto,
	): Promise<ResponseSuccessDto<IToken>> {
		const result = await this.authService.login(payload);
		return new ResponseSuccessDto({ data: result });
	}
}
