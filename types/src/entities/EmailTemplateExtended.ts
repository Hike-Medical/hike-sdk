import { EmailTemplate, Notification, NotificationMessage } from '../../prisma';

export type EmailTemplateExtended = Omit<EmailTemplate, 'htmlContent' | 'design'> & {
  notificationMessages: (Pick<NotificationMessage, 'id' | 'sequence' | 'type'> & {
    notification: Pick<Notification, 'id' | 'name' | 'type' | 'active' | 'companyId'>;
  })[];
};
