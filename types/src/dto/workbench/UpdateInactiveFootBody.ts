import { Side } from '../../../prisma';

export interface UpdateInactiveFootBody {
  isToeFiller?: boolean;
  patientAmputation?: Side;
}
