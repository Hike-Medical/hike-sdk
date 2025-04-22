import { Side } from '@prisma/client';

export interface UpdateInactiveFootBody {
  isToeFiller?: boolean;
  isPreFabOrHeatMoldable?: boolean;
  patientAmputation?: Side;
}
