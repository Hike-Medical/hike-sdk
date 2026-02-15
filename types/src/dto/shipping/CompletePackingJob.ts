export interface CompletePackingJobBody {
  facilityId: string;
  orderIds: string[];
  shippingPackageId: string;
}

export interface CompletePackingJobResponse {
  pdfUrl: string;
  trackingNumber: string;
  labelId: string;
}

export interface ConfirmPackedOrdersBody {
  orderIds: string[];
  shippingLabelId: string;
  missingOrderIds?: string[];
}
