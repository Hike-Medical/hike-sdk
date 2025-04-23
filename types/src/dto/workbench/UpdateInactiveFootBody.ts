import { Side } from '../../../prisma';

export interface UpdateInactiveFootBody {
  isToeFiller?: boolean;
  isPreFabOrHeatMoldable?: boolean;
  patientAmputation?: Side;
}
