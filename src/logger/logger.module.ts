import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelperModule } from 'src/helper/helper.module';
import { WorkspaceModule } from 'src/workspace/workspace.module';
import { Logger } from './entities/logger.entity';
import { LoggerController } from './logger.controller';
import { LoggerService } from './logger.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([Logger]),
		WorkspaceModule,
		HelperModule,
	],
	controllers: [LoggerController],
	providers: [LoggerService],
	exports: [LoggerService],
})
export class LoggerModule {}
