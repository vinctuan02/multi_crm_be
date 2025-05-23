import { Module } from '@nestjs/common';
import { HelperController } from './helper.controller';
import { DateService } from './services/date.service';
import { JsonService } from './services/json.service';
import { PasswordService } from './services/password.service';
import { ValidateService } from './services/validate.service';

@Module({
	imports: [],
	controllers: [HelperController],
	providers: [DateService, PasswordService, JsonService, ValidateService],
	exports: [DateService, PasswordService, JsonService, ValidateService],
})
export class HelperModule {}
