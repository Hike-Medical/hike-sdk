import { NotificationType } from '../../../prisma/index';

export interface GetNotificationsParams {
  type?: NotificationType[];
  includeShared?: boolean;
  active?: boolean;
}
