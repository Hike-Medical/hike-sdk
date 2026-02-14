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
