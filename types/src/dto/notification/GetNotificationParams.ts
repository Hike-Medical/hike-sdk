import { NotificationType } from '../../../prisma';

export interface GetNotificationParams {
  type?: NotificationType[];
  includeShared?: boolean;
  active?: boolean;
}
