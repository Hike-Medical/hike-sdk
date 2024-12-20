import type { Side } from '../../../prisma';

export interface GetSignalingChannelParams {
  footSide?: Side;
  patientId: string;
  workbenchId: string;
}
