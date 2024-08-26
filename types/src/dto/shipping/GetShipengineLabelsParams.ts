export interface GetShipengineLabelsParams {
  label_status?: 'processing' | 'completed' | 'error' | 'voided';
  service_code?: string;
  carrier_id?: string;
  tracking_number?: string;
  batch_id?: string;
  rate_id?: string;
  shipment_id?: string;
  warehouse_id?: string;
  created_at_start?: string;
  created_at_end?: string;
  page?: number;
  page_size?: number;
  sort_dir?: 'asc' | 'desc';
  sort_by?: 'modified_at' | 'created_at';
}
