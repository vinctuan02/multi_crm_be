import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './customer.controller';

import { UserWorkspaceModule } from 'src/user-workspace/user-workspace.module';
import { CustomerService } from './customer.service';
import { Customer } from './entities/customer.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Customer]), UserWorkspaceModule],
	providers: [CustomerService],
	controllers: [CustomerController],
})
export class CustomerModule {}
