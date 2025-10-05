export interface GetOrthofeetInventoryResponse {
  products: Record<
    string,
    {
      barcode: string;
      product: string;
      description: string;
      quantity: number;
    }
  >;
}
