import { CreateNotificationMessageParams } from './CreateNotificationMessageParams';

export interface UpdateNotificationMessageParams
  extends Partial<Omit<CreateNotificationMessageParams, 'notificationId'>> {}
