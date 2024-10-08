import { Notification, NotificationMessage } from '../../prisma/index';

export type NotificationExtended = Notification & {
  messages: NotificationMessage[];
};

export type MessageWithStats = NotificationMessage & {
  messagesSent: number;
  messagesQueued: number;
};

export type CampaignWithStats = Notification & {
  messages: MessageWithStats[];
  totalMessagesSent: number;
  patientCount: number;
};
