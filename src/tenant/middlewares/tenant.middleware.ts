import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { NextFunction, Request } from 'express';
import { WorkspaceService } from '../../workspace/services/workspace.service';
import { excludedSubdomains } from '../constants/tenant.constants';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
	constructor(private readonly workspaceService: WorkspaceService) {}

	async use(req: Request, res: Response, next: NextFunction) {
		const host = req.hostname;
		const parts = host.split('.');

		if (parts.length > 2) {
			const subdomain = parts[0];

			if (!excludedSubdomains.includes(subdomain)) {
				const workspace =
					await this.workspaceService.findBySubdomain(subdomain);
				if (!workspace)
					throw new NotFoundException('Workspace not found');
				req['workspace'] = workspace;
			} else {
				req['workspace'] = null;
			}
		} else {
			req['workspace'] = null;
		}
		next();
	}
}
