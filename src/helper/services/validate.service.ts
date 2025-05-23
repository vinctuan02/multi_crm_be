import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { TypeID } from 'src/common/typeorm/enum/db-type.enum';
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

	async validateManyExists(
		items: {
			repo: Repository<any>;
			id: TypeID;
			message?: string;
		}[],
	) {
		for (const item of items) {
			await this.validateExists(item);
		}
	}

	async validateExists<T>(data: {
		repo: Repository<T>;
		id: TypeID;
		message?: string;
	}): Promise<void> {
		const { repo, id, message = 'Invalid foreign key' } = data;
		const where = { id } as unknown as FindOptionsWhere<T>;

		const exists = await repo.findOne({
			where,
		});

		if (!exists) {
			throw new NotFoundException(message);
		}
	}
}
