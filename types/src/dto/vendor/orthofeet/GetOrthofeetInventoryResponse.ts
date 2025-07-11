export interface GetOrthofeetInventoryResponse {
  products: Record<
    string,
    {
      barcode: string;
      style: string;
      quantity: number;
      active: boolean;
    }
  >;
}
