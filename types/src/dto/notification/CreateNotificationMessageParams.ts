import { CommunicationChannel } from '../../../prisma/index';

export interface CreateNotificationMessageParams {
  notificationId: string;
  sequence: number;
  delayMinutes?: number | null;
  transactional?: boolean;
  message: string;
  channel: CommunicationChannel;
  emailTemplateId?: string;
}
