import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserWorkspace } from '../entities/user-workspace.entity';

@Injectable()
export class UserWorkspaceQueryService {
	constructor(
		@InjectRepository(UserWorkspace)
		private readonly userWorkspaceRepository: Repository<UserWorkspace>,
	) {}

	createQueryBuidler() {
		const queryBuilder =
			this.userWorkspaceRepository.createQueryBuilder('userWorkspace');
	}
}
