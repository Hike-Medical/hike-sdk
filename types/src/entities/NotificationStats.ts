import { SenderMessageStatus } from '../../prisma';

export interface NotificationStats {
  id: string;
  name: string;
  total: number;
  sent: number;
  pending: number;
  clicked: number;
  opened: number;
  unsubscribed: number;
  status: Record<SenderMessageStatus, number>;
}
