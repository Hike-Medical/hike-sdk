import { InactiveFootReason, Side } from '../../../prisma';

export interface FootStatus {
  id: string;
  side: Side;
  notStarted: boolean;
  error: boolean;
  pending: boolean;
  rejected: boolean;
  success: boolean;
  active: boolean;
  inactiveReason: InactiveFootReason | null;
}
