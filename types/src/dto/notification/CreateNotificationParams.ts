import { CommunicationChannel, NotificationType } from '../../../prisma/index';

export interface CreateNotificationParams {
  name: string;
  description?: string;
  startTime?: Date;
  endTime?: Date;
  recurrencePattern?: string;
  active?: boolean;
  transactional?: boolean;
  message: string;
  type: NotificationType;
  limit?: number;
  channel: CommunicationChannel;
  emailTemplateId?: string;
  pathwayId?: string;
}
