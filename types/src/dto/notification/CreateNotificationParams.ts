import { CommunicationChannel, NotificationType } from '../../../prisma/index';

export interface CreateNotificationParams {
  name: string;
  description?: string;
  startTime?: Date;
  endTime?: Date;
  active?: boolean;
  transactional?: boolean;
  message: string;
  type: NotificationType;
  delayMinutes?: number;
  channel: CommunicationChannel;
  emailTemplateId?: string;
}
