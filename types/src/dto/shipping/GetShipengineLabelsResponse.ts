import { ShipmentLinks } from './GetShipengineShippingResponse';

export interface GetShipengineLabelsResponse {
  labels: LabelsResponse[];
  total: number;
  page: string;
  pages: number;
  links: ShipmentLinks;
}

export interface LabelsResponse {
  label_id: string;
  status: string;
  shipment_id: string;
  ship_date: string;
  created_at: string;
  shipment_cost: ShipmentCost;
  insurance_cost: InsuranceCost;
  requested_comparison_amount: unknown;
  rate_details: unknown[];
  tracking_number: string;
  is_return_label: boolean;
  rma_number: unknown;
  is_international: boolean;
  batch_id: string;
  carrier_id: string;
  service_code: string;
  package_code: string;
  voided: boolean;
  voided_at: unknown;
  label_format: string;
  display_scheme: string;
  label_layout: string;
  trackable: boolean;
  label_image_id: unknown;
  carrier_code: string;
  tracking_status: string;
  label_download: LabelDownload;
  form_download: unknown;
  qr_code_download: unknown;
  insurance_claim: unknown;
  paperless_download: unknown;
  packages: Package[];
  charge_event: string;
  alternative_identifiers: unknown[];
  shipping_rule_id: unknown;
}

interface ShipmentCost {
  currency: string;
  amount: number;
}

interface InsuranceCost {
  currency: string;
  amount: number;
}

interface LabelDownload {
  pdf: string;
  png: string;
  zpl: string;
  href: string;
}

interface Package {
  package_id: number;
  package_code: string;
  weight: Weight;
  dimensions: Dimensions;
  insured_value: InsuredValue;
  tracking_number: string;
  label_download: LabelDownload2;
  qr_code_download: unknown;
  paperless_download: unknown;
  label_messages: LabelMessages;
  external_package_id: unknown;
  content_description: unknown;
  sequence: number;
  alternative_identifiers: unknown[];
  has_label_documents: boolean;
  has_form_documents: boolean;
  has_qr_code_documents: boolean;
  has_paperless_label_documents: boolean;
}

interface Weight {
  value: number;
  unit: string;
}

interface Dimensions {
  unit: string;
  length: number;
  width: number;
  height: number;
}

interface InsuredValue {
  currency: string;
  amount: number;
}

interface LabelDownload2 {
  pdf: string;
  png: string;
  zpl: string;
}

interface LabelMessages {
  reference1: string;
  reference2: string;
  reference3: string;
}
