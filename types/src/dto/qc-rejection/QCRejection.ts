import type { Order, OrderStatus, User, Workbench } from '../../../prisma';
import type { QCRejectionReasonWithStations } from './QCRejectionReason';
import type { QCRejectionStatus } from './QCRejectionStatus';

export interface QCRejection {
  id: string;
  orderId: string;
  sourceStation: OrderStatus;
  targetStation: OrderStatus;
  reasonId: string | null;
  customReason: string | null;
  leftQuantity: number;
  rightQuantity: number;
  photos: string[];
  status: QCRejectionStatus;
  reviewedById: string | null;
  reviewedAt: Date | null;
  reviewNotes: string | null;
  correctedReasonId: string | null;
  correctedReason: string | null;
  needsReprint: boolean;
  ktAcknowledgedById: string | null;
  ktAcknowledgedAt: Date | null;
  ktAcknowledgedNotes: string | null;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface QCRejectionWithRelations extends QCRejection {
  order: Order & {
    workbench: Workbench & {
      patient: { id: string; firstName: string | null; lastName: string | null };
      evaluation: { id: string; companyId: string; poNumber: string | null };
    };
  };
  reason: QCRejectionReasonWithStations | null;
  correctedReasonRef: QCRejectionReasonWithStations | null;
  createdBy: Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>;
  reviewedBy: Pick<User, 'id' | 'firstName' | 'lastName' | 'email'> | null;
  ktAcknowledgedBy: Pick<User, 'id' | 'firstName' | 'lastName' | 'email'> | null;
}
