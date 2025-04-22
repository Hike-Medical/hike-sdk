import { Notification, NotificationHistory, NotificationMessage } from '@prisma/client';

export type NotificationHistoryMessageExtended = NotificationHistory & {
  message: NotificationMessage & { notification: Notification };
};
