import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { WorkspaceService } from 'src/workspace/workspace.service';
import { LoggerService } from '../logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	constructor(
		private readonly loggerService: LoggerService,
		private readonly workspaceService: WorkspaceService,
	) {}

	async use(req: Request, res: Response, next: NextFunction) {
		const chunks: (Buffer | string | object)[] = [];
		const originalSend = res.send.bind(res);

		res.send = (body: any): Response => {
			chunks.push(body);
			res.send = originalSend;
			return res.send(body);
		};

		res.on('close', () => {
			const responseBody = chunks.length > 0 ? chunks[0] : undefined;

			this.loggerService
				.logFromRequest(req, res, responseBody)
				.catch(console.error);
		});

		next();
	}
}
