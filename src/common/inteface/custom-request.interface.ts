// src/common/interfaces/custom-request.interface.ts
import { Request } from 'express';
import { User } from 'src/user/entities/user.entity';
import { Workspace } from 'src/workspace/entities/workspace.entity';

export interface CustomRequest extends Request {
	user?: User;
	workspace?: Workspace;
}
