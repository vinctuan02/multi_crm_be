export interface EmailData {
	content: string;
	subject: string;
}

export interface DataInvite {
	recipientName: string;
	inviterName: string;
	workspaceName: string;
	inviteLink: string;
}
