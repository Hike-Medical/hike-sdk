import { NotificationType } from '../../../prisma';

export interface GetNotificationsParams {
  type?: NotificationType[];
  includeShared?: boolean;
  active?: boolean;
}
