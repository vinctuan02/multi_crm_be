import { ConflictException, Injectable } from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class ValidateService {
	async validateUnique<T>(data: {
		repo: Repository<T>;
		where: FindOptionsWhere<T> | FindOptionsWhere<T>[];
		message?: string;
	}): Promise<void> {
		const { repo, where, message = 'Duplicated value' } = data;
		const exists = await repo.findOne({ where });
		if (exists) {
			throw new ConflictException(message);
		}
	}
}
