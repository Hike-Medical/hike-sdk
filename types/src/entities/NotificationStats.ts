import { SenderMessageStatus } from '../../prisma';

export interface NotificationStats {
  id: string;
  name: string;
  total: number;
  sent: number;
  clicked: number;
  status: {
    [key in SenderMessageStatus]: number;
  };
}
