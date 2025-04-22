import { SenderMessageStatus } from '../../prisma/index';

export interface NotificationStats {
  id: string;
  name: string;
  total: number;
  sent: number;
  clicked: number;
  opened: number;
  unsubscribed: number;
  status: {
    [key in SenderMessageStatus]: number;
  };
}
