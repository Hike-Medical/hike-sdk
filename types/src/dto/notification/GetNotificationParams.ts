import { NotificationType } from '../../../prisma';

export interface GetNotificationParams {
  type?: NotificationType[];
  active?: boolean;
}
