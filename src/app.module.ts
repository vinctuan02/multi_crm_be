import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { envValidationSchema } from './common/config/joi.validate-env';
import { DatabaseOptions } from './common/typeorm/ormconfig';
import { CustomerModule } from './customer/customer.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { HelperModule } from './helper/helper.module';
import { LoggerModule } from './logger/logger.module';
import { LoggerMiddleware } from './logger/middlewares/logger.middleware';
import { NotificationModule } from './notification/notification.module';
import { OrderModule } from './order/order.module';
import { TenantMiddleware } from './tenant/middlewares/tenant.middleware';
import { UserModule } from './user/user.module';
import { WorkspaceModule } from './workspace/workspace.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validationSchema: envValidationSchema,
		}),

		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useClass: DatabaseOptions,
		}),

		OrderModule,
		UserModule,
		AuthModule,
		HelperModule,
		DashboardModule,
		LoggerModule,
		WorkspaceModule,
		CustomerModule,
		NotificationModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*');
		consumer.apply(TenantMiddleware).forRoutes('*');
	}
}
