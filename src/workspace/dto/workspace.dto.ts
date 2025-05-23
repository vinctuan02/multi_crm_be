import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
export class CreateWorkspaceDto {
	@IsNotEmpty()
	@MaxLength(200)
	name: string;

	@IsNotEmpty()
	@MaxLength(200)
	subdomain: string;

	@IsOptional()
	@MaxLength(1900)
	logoUrl: string;
}

export class UpdateWorkspaceDto extends PartialType(CreateWorkspaceDto) {}
