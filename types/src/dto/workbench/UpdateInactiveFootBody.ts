import { Side } from '../../../prisma/index';

export interface UpdateInactiveFootBody {
  isToeFiller?: boolean;
  isPreFabOrHeatMoldable?: boolean;
  patientAmputation?: Side;
}
