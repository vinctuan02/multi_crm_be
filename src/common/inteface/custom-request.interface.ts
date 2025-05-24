// src/common/interfaces/custom-request.interface.ts
import { Request } from 'express';
import { JwtUser } from 'src/jwt/interfaces/jwt.interface';
import { Workspace } from 'src/workspace/entities/workspace.entity';

export interface CustomRequest extends Request {
	user?: JwtUser;
	workspace?: Workspace;
}
