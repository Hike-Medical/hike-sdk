import { EmailTemplate, Notification, NotificationMessage } from '../../prisma/index';

export type NotificationMessageExtended = NotificationMessage & {
  emailTemplate?: EmailTemplate | null;
};

export type NotificationExtended = Notification & {
  messages: NotificationMessageExtended[];
};

export type MessageWithStats = NotificationMessageExtended & {
  messagesSent: number;
  messagesQueued: number;
};

export type SurveyResponseInfo = {
  response: string | null;
  responseReceivedAt: Date | null;
};

export type CampaignWithStats = Notification & {
  messages: MessageWithStats[];
  totalMessagesSent: number;
  patientCount: number;
  companySlugs: string[];
  surveyResponses: SurveyResponseInfo[];
};
