import { EmailTemplate, Notification, NotificationMessage } from '@prisma/client';

export type NotificationMessageExtended = NotificationMessage & {
  emailTemplate?: EmailTemplate | null;
};

export type NotificationExtended = Notification & {
  messages: NotificationMessageExtended[];
};
