import { composeAsync } from 'expo-mail-composer';

export const name = 'MailComposer';

export function test({ describe, it, expect }) {
  describe('composeAsync', () => {
    it('opens the email composer', async () => {
      composeAsync({
        recipients: ['test@user.com'],
        ccRecipients: ['test2@user.com'],
        bccRecipients: ['test3@user.com'],
        subject: 'test subject',
        body: 'test body',
        isHtml: true,
        attachments: [],
      });
    });
  });
}
