import { NotificationType } from '@prisma/client';

export interface GetNotificationsParams {
  type?: NotificationType[];
  includeShared?: boolean;
  active?: boolean;
}
