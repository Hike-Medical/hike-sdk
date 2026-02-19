import { OrderStatus } from '../../../prisma';

export interface ValidateOrderBeforePackingParams {
  poNumber: string;
}

export type PackingValidationResult =
  | { valid: true }
  | { valid: false; reason: 'NOT_FOUND' }
  | { valid: false; reason: 'MISSING'; destinationFacilityName: string | null }
  | { valid: false; reason: 'WRONG_STATUS'; status: OrderStatus };

export interface ValidateOrderBeforePackingResponse {
  orderId: string | null;
  poNumber: string;
  companySlug: string | null;
  validation: PackingValidationResult;
}
