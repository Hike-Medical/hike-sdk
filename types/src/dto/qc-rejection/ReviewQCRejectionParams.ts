import type { OrderStatus } from '../../../prisma';
import type { QCRejectionStatus } from './QCRejectionStatus';

export interface ReviewQCRejectionParams {
  rejectionId: string;
  status: QCRejectionStatus;
  reviewNotes?: string;
  correctedReasonId?: string;
  correctedReason?: string;
  correctedTargetStation?: OrderStatus;
  jwtToken?: string;
}
