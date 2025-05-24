import { IsEnum, IsOptional } from 'class-validator';
import { UserFieldQueryEnum } from '../enum/user.field-query.enum';

export class QueryGetDetailUserDto {
	@IsOptional()
	@IsEnum(UserFieldQueryEnum)
	fieldName?: UserFieldQueryEnum = UserFieldQueryEnum.ID;
}
