export interface GetShipmentsParams {
  shipment_status?: 'pending' | 'processing' | 'label_purchased' | 'cancelled';
  batch_id?: string;
  tag?: string;
  created_at_start?: string;
  created_at_end?: string;
  modified_at_start?: string;
  modified_at_end?: string;
  page?: number;
  page_size?: number;
  sales_order_id?: string;
  sort_dir?: 'asc' | 'desc';
  sort_by?: 'modified_at' | 'created_at';
}
