export interface CompletePackingJobBody {
  configurationId: string;
  orderIds: string[];
  shippingPackageId: string;
  weight: number;
}

export interface CompletePackingJobResponse {
  trackingNumber: string;
  labelId: string;
  labelPrintSuccess: boolean;
  packingSlipPrintSuccess: boolean;
  labelPdfUrl: string | null;
  packingSlipPdfUrl: string | null;
}

export interface ConfirmPackedOrdersBody {
  orderIds: string[];
  shippingLabelId: string;
  missingOrderIds?: string[];
}
