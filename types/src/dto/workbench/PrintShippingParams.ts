export interface PrintShippingParams {
  withShippingLabel: boolean;
  withPamphlet: boolean;
  configurationId?: string;
  existingLabelId?: string;
}

export interface PrintShippingResult {
  shippingLabel: {
    id: string;
    labelId: string | null;
    addressName: string;
    trackingNumber: string | null;
  } | null;
  pamphletPrinted: boolean;
}
