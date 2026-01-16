export interface CascadeAvailabilityResponse {
  status: string;
  message: string | null;
  data: {
    uid: number;
    itemId: string;
    warehouses: {
      warehouseId: number;
      warehouseName: string;
      purchaseClass: string;
      sellable: string;
      qtyAvailable: number;
      source: string;
    }[];
    source: string;
  }[];
}
