import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsOptional, IsString } from 'class-validator';
export class CreateCustomerDto {
	@IsString()
	name: string;

	@IsEmail()
	@IsOptional()
	email?: string;

	@IsString()
	@IsOptional()
	phone?: string;

	@IsString()
	@IsOptional()
	status?: string;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
