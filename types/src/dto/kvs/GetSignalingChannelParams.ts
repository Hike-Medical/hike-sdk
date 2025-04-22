import type { Side } from '@prisma/client';

export interface GetSignalingChannelParams {
  footSide?: Side;
  patientId: string;
  workbenchId: string;
}
