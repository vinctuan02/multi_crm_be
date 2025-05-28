import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataListSuccessDto } from 'src/common/dto/response.dto';
import { TypeID } from 'src/common/typeorm/enum/db-type.enum';
import { Repository } from 'typeorm';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
	constructor(
		@InjectRepository(Customer)
		private readonly customerRepo: Repository<Customer>,
	) {}

	async create(
		workspaceId: number,
		dto: CreateCustomerDto,
	): Promise<Customer> {
		const customer = this.customerRepo.create({ ...dto, workspaceId });
		return this.customerRepo.save(customer);
	}

	async findAll(workspaceId: TypeID): Promise<DataListSuccessDto<Customer>> {
		const customers = await this.customerRepo.find({
			where: { workspaceId },
		});
		return new DataListSuccessDto<Customer>(customers);
	}

	async findOne(workspaceId: TypeID, id: TypeID): Promise<Customer> {
		const customer = await this.customerRepo.findOne({
			where: { id, workspaceId },
		});
		if (!customer) throw new NotFoundException('Customer not found');
		return customer;
	}

	async update(
		workspaceId: TypeID,
		id: TypeID,
		dto: UpdateCustomerDto,
	): Promise<Customer> {
		const customer = await this.findOne(workspaceId, id);
		Object.assign(customer, dto);
		return await this.customerRepo.save(customer);
	}

	async remove(workspaceId: TypeID, id: TypeID): Promise<Customer> {
		const customer = await this.findOne(workspaceId, id);
		await this.customerRepo.remove(customer);
		return customer;
	}
}
