export interface CascadeOrderRequest {
  poNo?: string;
  webReferenceNo?: string;
  placedByName: string;
  shipToName: string;
  shipToPhone: string;
  shipToAddress1: string;
  shipToAddress2?: string;
  shipToCity: string;
  oeHdrShip2State: string;
  zipCode?: string;
  shipToCountry: string;
  shipToMailAddress?: string;
  line: {
    itemId: number;
    unitQuantity: number;
    note?: string;
  };
}
