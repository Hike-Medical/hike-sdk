export interface GetRatesResponse {
  rateId: string;
  serviceType: string;
  totalAmount: number;
  deliveryDays: number;
  estimatedDeliveryDate: string;
  carrierName: string;
}
