// src/notification/notification.service.ts
import { Injectable } from '@nestjs/common';

import { MessageService } from 'src/helper/services/message.service';
import { User } from 'src/user/entities/user.entity';
import { Workspace } from 'src/workspace/entities/workspace.entity';
import { DataInvite, EmailData } from '../inteface/notification.inteface';
import { EmailProvider } from './providers/email.provider';

@Injectable()
export class NotificationService {
	constructor(
		private readonly emailProvider: EmailProvider,
		private readonly messageService: MessageService,
	) {}

	async sendNotificationInvite(data: {
		toUser: User;
		fromUser: User;
		workspace: Workspace;
	}) {
		const { toUser, fromUser, workspace } = data;

		const dataInvite: DataInvite = {
			recipientName: fromUser.fullName,
			inviterName: toUser.fullName,
			workspaceName: workspace.name,
			inviteLink: 'abc',
		};

		const contentEmail = await this.messageService.renderTemplateFromFile(
			'templates/email/invite.html',
			dataInvite,
		);
		const telegram = await this.messageService.renderTemplateFromFile(
			'templates/telegram/invite.txt',
			dataInvite,
		);

		this.sendNotification({
			to: toUser,
			message: {
				email: {
					content: contentEmail,
					subject: 'Workspace invitation email',
				},
				telegram,
			},
		});
	}

	sendNotification(data: {
		to: User;
		message: { email?: EmailData; telegram?: string };
	}) {
		const {
			to,
			message: { email, telegram },
		} = data;
		if (email) {
			this.emailProvider.sendMail({
				to: to.email,
				subject: email.subject,
				html: email.content,
			});
		}

		if (telegram) {
		}
	}
}
