export interface GetLabelTrackingInfo {
  tracking_number: string;
  tracking_url: string;
  status_code: string;
  carrier_code: string;
  carrier_id: string;
  status_description: string;
  carrier_status_code: number;
  carrier_detail_code: string;
  carrier_status_description: string;
  ship_date: string;
  estimated_delivery_date: string;
  actual_delivery_date: string;
  exception_description: string;
  events: Event[];
}

interface Event {
  occurred_at: string;
  carrier_occurred_at: string;
  description: string;
  city_locality: string;
  state_province: string;
  postal_code: number;
  country_code: string;
  company_name: string;
  signer: string;
  event_code: string;
  carrier_detail_code: string;
  status_code: string;
  status_description: string;
  carrier_status_code: number;
  carrier_status_description: string;
  latitude: number;
  longitude: number;
}
