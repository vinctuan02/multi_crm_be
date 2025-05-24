// src/notification/notification.service.ts
import { Injectable } from '@nestjs/common';
import { EmailProvider } from './providers/email.provider';

@Injectable()
export class NotificationService {
	constructor(private readonly emailProvider: EmailProvider) {}

	async sendEmailNotification(data: {
		to: string;
		subject: string;
		html: string;
	}) {
		await this.emailProvider.sendMail(data);
	}
}
