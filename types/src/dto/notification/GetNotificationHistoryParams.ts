import type { PagedParams } from '../PagedParams';

export interface GetNotificationHistoryParams extends PagedParams {
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
}
