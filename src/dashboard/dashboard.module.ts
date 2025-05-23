import { Module } from '@nestjs/common';
import { OrderModule } from 'src/order/order.module';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './services/dashboard.service';

@Module({
	imports: [OrderModule],
	controllers: [DashboardController],
	providers: [DashboardService],
})
export class DashboardModule {}
