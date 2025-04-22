import type { Side } from '../../../prisma/index';

export interface GetSignalingChannelParams {
  footSide?: Side;
  patientId: string;
  workbenchId: string;
}
