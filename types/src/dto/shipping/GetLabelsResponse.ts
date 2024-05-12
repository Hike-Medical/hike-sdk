export interface GetLabelsResponse {
  labelId: string;
  shipDate: string;
  trackingNumber: string;
  pdfLink: string;
  packages: {
    packageId: number;
    pdfLink: string;
    packages: string[];
  }[];
}
