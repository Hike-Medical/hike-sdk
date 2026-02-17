export interface GetShipengineShipmentsResponse {
  shipments: Shipment[];
  total: number;
  page: string;
  pages: number;
  links: ShipmentLinks;
}

export interface Shipment {
  shipment_id: string;
  carrier_id: string;
  service_code: string;
  shipping_rule_id: string;
  external_order_id: string;
  items: unknown[];
  tax_identifiers: TaxIdentifier[];
  external_shipment_id: string;
  shipment_number: string;
  ship_date: string;
  created_at: string;
  modified_at: string;
  shipment_status: string;
  ship_to: ShipTo;
  ship_from: ShipFrom;
  warehouse_id: string;
  return_to: ReturnTo;
  is_return: boolean;
  confirmation: string;
  customs: Customs;
  advanced_options: AdvancedOptions;
  insurance_provider: string;
  tags: unknown[];
  order_source_code: string;
  packages: Package[];
  total_weight: TotalWeight;
  comparison_rate_type: string;
}

export interface ShipmentLinks {
  first: Link;
  last: Link;
  prev: Link;
  next: Link;
}

interface Link {
  href: string;
  type: string;
}

export interface TaxIdentifier {
  taxable_entity_type: string;
  identifier_type: string;
  issuing_authority: string;
  value: string;
}

export interface ShipTo {
  name: string;
  phone: string;
  email: string;
  company_name: string;
  address_line1: string;
  address_line2: string;
  address_line3: string;
  city_locality: string;
  state_province: string;
  postal_code: string;
  country_code: string;
  address_residential_indicator: string;
  instructions: string;
  geolocation: Geolocation[];
}

export interface Geolocation {
  type: string;
  value: string;
}

export interface ShipFrom {
  name: string;
  phone: string;
  email: string;
  company_name: string;
  address_line1: string;
  address_line2: string;
  address_line3: string;
  city_locality: string;
  state_province: string;
  postal_code: string;
  country_code: string;
  address_residential_indicator: string;
  instructions: string;
}

export interface ReturnTo {
  name: string;
  phone: string;
  email: string;
  company_name: string;
  address_line1: string;
  address_line2: string;
  address_line3: string;
  city_locality: string;
  state_province: string;
  postal_code: string;
  country_code: string;
  address_residential_indicator: string;
  instructions: string;
}

export interface Customs {
  contents: string;
  contents_explanation: string;
  non_delivery: string;
  terms_of_trade_code: string;
  declaration: string;
  invoice_additional_details: InvoiceAdditionalDetails;
  importer_of_record: ImporterOfRecord;
  customs_items: unknown[];
}

export interface InvoiceAdditionalDetails {
  freight_charge: FreightCharge;
  insurance_charge: InsuranceCharge;
  discount: Discount;
  other_charge: OtherCharge;
  other_charge_description: string;
}

export interface FreightCharge {
  currency: string;
  amount: number;
}

export interface InsuranceCharge {
  currency: string;
  amount: number;
}

export interface Discount {
  currency: string;
  amount: number;
}

export interface OtherCharge {
  currency: string;
  amount: number;
}

export interface ImporterOfRecord {
  name: string;
  phone: string;
  email: string;
  company_name: string;
  address_line1: string;
  address_line2: string;
  address_line3: string;
  city_locality: string;
  state_province: string;
  postal_code: string;
  country_code: string;
}

export interface AdvancedOptions {
  bill_to_account: unknown;
  bill_to_country_code: string;
  bill_to_party: string;
  bill_to_postal_code: unknown;
  contains_alcohol: boolean;
  delivered_duty_paid: boolean;
  dry_ice: boolean;
  dry_ice_weight: DryIceWeight;
  non_machinable: boolean;
  saturday_delivery: boolean;
  fedex_freight: FedexFreight;
  use_ups_ground_freight_pricing: unknown;
  freight_class: number;
  custom_field1: unknown;
  custom_field2: unknown;
  custom_field3: unknown;
  origin_type: string;
  additional_handling: unknown;
  shipper_release: unknown;
  collect_on_delivery: CollectOnDelivery;
  third_party_consignee: boolean;
  dangerous_goods: boolean;
  dangerous_goods_contact: DangerousGoodsContact;
}

export interface DryIceWeight {
  value: number;
  unit: string;
}

export interface FedexFreight {
  shipper_load_and_count: string;
  booking_confirmation: string;
}

export interface CollectOnDelivery {
  payment_type: string;
  payment_amount: PaymentAmount;
}

export interface PaymentAmount {
  currency: string;
  amount: number;
}

export interface DangerousGoodsContact {
  name: string;
  phone: string;
}

export interface Package {
  package_id: string;
  package_code: string;
  content_description: string;
  weight: Weight;
  dimensions: Dimensions;
  insured_value: InsuredValue;
  tracking_number: string;
  label_messages: LabelMessages;
  external_package_id: string;
  label_download: LabelDownload;
  form_download: FormDownload;
  sequence: number;
  products: unknown[];
}

export interface Weight {
  value: number;
  unit: string;
}

export interface Dimensions {
  unit: string;
  length: number;
  width: number;
  height: number;
}

export interface InsuredValue {
  '0': N0;
  currency: string;
  amount: number;
}

export interface N0 {
  currency: string;
  amount: number;
}

export interface LabelMessages {
  reference1: unknown;
  reference2: unknown;
  reference3: unknown;
}

export interface LabelDownload {
  href: string;
  pdf: string;
  png: string;
  zpl: string;
}

export interface FormDownload {
  href: string;
  type: string;
}

export interface TotalWeight {
  value: number;
  unit: string;
}
