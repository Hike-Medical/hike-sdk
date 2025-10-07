import { SenderMessageStatus } from '../../prisma';

export interface NotificationStats {
  id: string;
  name: string;
  total: number;
  dispatched: number;
  pending: number;
  clicked: number;
  opened: number;
  unsubscribed: number;
  status: Record<SenderMessageStatus, number>;
}
