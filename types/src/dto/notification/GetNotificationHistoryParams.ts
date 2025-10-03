import type { SenderMessageStatus } from '../../../prisma';
import type { PagedParams } from '../PagedParams';

export interface GetNotificationHistoryParams extends PagedParams {
  filter?: Partial<Record<'status', SenderMessageStatus>>;
  sortBy?:
    | 'status'
    | 'responseAt'
    | 'sentAt'
    | 'clickedAt'
    | 'openedAt'
    | 'unsubscribedAt'
    | 'webhookAt'
    | 'createdAt'
    | 'updatedAt';
  nullFilter?: string[];
  notNullFilter?: string[];
}
