import { InactiveFootReason } from '../../../prisma';

export interface FootStatus {
  id: string;
  notStarted: boolean;
  error: boolean;
  pending: boolean;
  rejected: boolean;
  success: boolean;
  active: boolean;
  inactiveReason: InactiveFootReason | null;
}
