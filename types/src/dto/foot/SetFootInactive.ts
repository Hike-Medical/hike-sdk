import { InactiveFootReason } from '../../../prisma/index';

export interface SetFootInactive {
  inactiveReason: InactiveFootReason;
}
