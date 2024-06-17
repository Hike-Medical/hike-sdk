import { PagedResponse } from 'dto/PagedResponse';
import { OrderStatus } from '../../../prisma';

interface AggregatedWorkbench {
  orderId: string;
  evaluationId: string;
  workbenchId: string;
  companyId: string;
  orderStatus?: OrderStatus;
  poNumber?: string;
  clinicianName?: string;
  clinicianId?: string;
  patientId?: string;
  patientFirstName?: string;
  patientLastName?: string;
  orderCreatedAt?: Date;
  authorizationUpdatedAt?: Date;
  orderCompletedAt?: Date;
  isDiabetic?: boolean;
  orderSide?: number;
}

export interface AggregatedWorkbenchResponse extends PagedResponse<AggregatedWorkbench[]> {}
