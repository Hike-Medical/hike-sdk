import { SenderMessageStatus } from '../../prisma';

export interface NotificationStats {
  id: string;
  name: string;
  total: number;
  sent: number;
  failed: number;
  clicked: number;
  status: {
    [key in SenderMessageStatus]: number;
  };
}
