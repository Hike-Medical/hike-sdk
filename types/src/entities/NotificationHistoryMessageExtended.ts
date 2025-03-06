import { Notification, NotificationHistory, NotificationMessage } from '../../prisma/index';

export type NotificationHistoryMessageExtended = NotificationHistory & {
  message: NotificationMessage & { notification: Notification };
};
