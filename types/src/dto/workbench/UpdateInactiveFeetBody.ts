import { Side } from '../../../prisma';

export interface UpdateInactiveFeetBody {
  isToeFiller?: boolean;
  patientAmputation?: Side;
}
