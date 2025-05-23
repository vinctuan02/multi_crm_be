import { TypeID } from 'src/common/typeorm/enum/db-type.enum';

export interface JwtPayload {
	sub: TypeID;
	email: string;
	role: string;
}

export interface JwtUser {
	id: TypeID;
	email: string;
	role: string;
}
