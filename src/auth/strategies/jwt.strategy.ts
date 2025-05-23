import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload, JwtUser } from 'src/jwt/interfaces/jwt.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(private readonly configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get<string>('JWT_SECRET'),
			algorithms: ['HS256'],
		});
	}

	validate(payload: JwtPayload): JwtUser {
		if (!payload?.sub || !payload?.email) {
			throw new UnauthorizedException('Invalid token');
		}

		return {
			id: payload.sub,
			email: payload.email,
			role: payload.role,
		};
	}
}
