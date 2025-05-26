import { Module } from '@nestjs/common';
import { HelperModule } from 'src/helper/helper.module';
import { NotificationService } from './services/notification.service';
import { EmailProvider } from './services/providers/email.provider';

@Module({
	imports: [HelperModule],
	providers: [NotificationService, EmailProvider],
	exports: [NotificationService],
})
export class NotificationModule {}
