import { Injectable } from '@nestjs/common';

interface InviteTemplateParams {
    workspaceName: string;
    invitedByName: string;
    inviteLink: string;
}

@Injectable()
export class TemplateService {
    getInviteTemplate({ workspaceName, invitedByName, inviteLink }: InviteTemplateParams): string {
        return `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>You've been invited to join a workspace!</h2>
        <p><strong>${invitedByName}</strong> has invited you to join the workspace <strong>${workspaceName}</strong>.</p>
        <p>Please click the link below to accept the invitation:</p>
        <a href="${inviteLink}" style="padding: 10px 20px; background-color: #348EFE; color: white; text-decoration: none; border-radius: 4px;">
          Join Workspace
        </a>
        <p>If you did not expect this email, you can ignore it.</p>
      </div>
    `;
    }

}
