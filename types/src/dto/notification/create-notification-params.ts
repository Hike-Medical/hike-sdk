import { CommunicationChannel, NotificationResponseType, NotificationType } from '../../../prisma/index';

export interface CreateNotificationParams {
  name: string;
  description?: string;
  startTime?: Date;
  endTime?: Date;
  recurrencePattern?: string;
  active?: boolean;
  message: string;
  type: NotificationType;
  responseType?: NotificationResponseType;
  limit?: number;
  channel: CommunicationChannel;
  emailTemplateId?: string;
  pathwayId?: string;
}
