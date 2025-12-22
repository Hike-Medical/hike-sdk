export interface OrthofeetOrderItem {
  style_number: string;
  qty: number;
}

export interface OrthofeetOrderRequest {
  account_id: string;
  customer_po: string;
  customer_name: string;
  address_line_1: string;
  address_line_2: string;
  state: string;
  state_code: string;
  zip: string;
  country: string;
  items: OrthofeetOrderItem[];
}
