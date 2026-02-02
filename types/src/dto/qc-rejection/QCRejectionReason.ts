import type { OrderStatus } from '../../../prisma';

export interface QCRejectionReasonStation {
  id: string;
  reasonId: string;
  station: OrderStatus;
  createdAt: Date;
}

export interface QCRejectionReason {
  id: string;
  label: string;
  description: string | null;
  photos: string[];
  active: boolean;
  sortOrder: number;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
  stations?: QCRejectionReasonStation[];
}
