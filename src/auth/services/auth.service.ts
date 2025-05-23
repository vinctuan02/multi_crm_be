import { Injectable } from '@nestjs/common';
import { JwtService } from 'src/jwt/jwt.service';
import { UserCreateDto } from 'src/user/dto/user.create.dto';
import { UserService } from 'src/user/services/user.service';
import { AuthLoginDto } from '../dto/auth.login.dto';
import { IToken } from '../interfaces/auth.interface';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) {}

	async register(payload: UserCreateDto): Promise<IToken> {
		const newUser = await this.userService.createUser(payload);

		const token = this.jwtService.generateToken({
			sub: newUser.id,
			email: newUser.email,
			role: newUser.role,
		});

		return { token };
	}

	async login(user: AuthLoginDto): Promise<IToken> {
		const { email, password } = user;

		const validatedUser = await this.userService.validateUser(
			email,
			password,
		);

		const token = this.jwtService.generateToken({
			sub: validatedUser.id,
			email: validatedUser.email,
			role: validatedUser.role,
		});

		return { token };
	}
}
