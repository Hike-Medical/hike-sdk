import type { SupplierConfig } from '../types';

export interface OrthofeetFormFieldMappings {
  sku: string;
  description: string;
  heading: string;
  prefabQuantity?: string;
  [key: string]: string | undefined;
}

export interface OrthofeetConfig extends Omit<SupplierConfig, 'formFieldMappings'> {
  inventoryBuffer: number;
  formFieldMappings: OrthofeetFormFieldMappings;
}

export interface OrthofeetAppConfig {
  orthofeetSupplierId: string;
  orthofeetInventoryBuffer: number;
}

export const ORTHOFEET_FORM_FIELDS: OrthofeetFormFieldMappings = {
  sku: 'orderOrthofeetFootwearSKU',
  description: 'orderOrthofeetFootwearDescription',
  heading: 'orderOrthofeetFootwearHeading',
  prefabQuantity: 'orderOrthofeetPrefabQuantity'
};

export const getOrthofeetConfig = (appConfig: OrthofeetAppConfig): OrthofeetConfig => ({
  supplierId: appConfig.orthofeetSupplierId,
  inventoryBuffer: appConfig.orthofeetInventoryBuffer,
  formFieldMappings: ORTHOFEET_FORM_FIELDS
});
