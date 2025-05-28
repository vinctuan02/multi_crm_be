// src/common/interfaces/custom-request.interface.ts
import { Request } from 'express';
import { JwtUser } from 'src/jwt/interfaces/jwt.interface';
import { TypeID } from '../typeorm/enum/db-type.enum';

export interface CustomRequest extends Request {
	user?: JwtUser;
	workspaceId: TypeID;
}
