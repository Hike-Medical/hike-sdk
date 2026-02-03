import type { QCRejectionStatus } from './QCRejectionStatus';

export interface ReviewQCRejectionParams {
  rejectionId: string;
  status: QCRejectionStatus;
  reviewNotes?: string;
  correctedReasonId?: string;
  correctedReason?: string;
  jwtToken?: string;
}
