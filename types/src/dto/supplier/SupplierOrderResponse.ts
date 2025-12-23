/**
 * Generic response for supplier order submissions.
 * Used by the SupplierService to return a normalized response
 * regardless of which supplier processed the order.
 */
export interface SupplierOrderResponse {
  supplierId: string;
  supplierName: string;
  externalOrderId?: string;
  status?: string;
}
