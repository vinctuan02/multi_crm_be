import { Module } from '@nestjs/common';
import { NotificationService } from './services/notification.service';
import { EmailProvider } from './services/providers/email.provider';

@Module({
	providers: [NotificationService, EmailProvider],
	exports: [NotificationService],
})
export class NotificationModule {}
