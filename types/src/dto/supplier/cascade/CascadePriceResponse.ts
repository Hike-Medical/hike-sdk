export interface CascadePriceResponse {
  status: string;
  message: string | null;
  data: {
    foundItems: {
      uid: number;
      itemId: string;
      basePrice: number;
      unitPrice: number;
    }[];
    notFoundItems: {
      uid: number;
      itemId: string;
    }[];
  };
}
