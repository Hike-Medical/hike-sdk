import { Notification, NotificationHistory, NotificationMessage } from '../../prisma';

export type NotificationHistoryMessageExtended = NotificationHistory & {
  message: (NotificationMessage & { notification: Notification }) | null;
};
