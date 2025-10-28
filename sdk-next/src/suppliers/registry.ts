import type { InternalSupplierAdapterParams } from './hooks/useSupplierAdapter';
import { ORTHOFEET_SUPPLIER_ID } from './orthofeet/config';
import { useOrthofeetAdapter } from './orthofeet/hooks/useOrthofeetAdapter';
import type { SupplierAdapter } from './types';

/**
 * Type for supplier adapter hooks
 */
type SupplierAdapterHook = (params: InternalSupplierAdapterParams) => SupplierAdapter;

/**
 * Registry mapping supplier IDs to their adapter hooks
 */
export const SUPPLIER_ADAPTERS: Record<string, SupplierAdapterHook> = {
  [ORTHOFEET_SUPPLIER_ID]: useOrthofeetAdapter
  // Future suppliers can be added here:
  // [ACME_SUPPLIER_ID]: useAcmeAdapter,
} as const;

/**
 * Get list of supported supplier IDs
 */
export const getSupportedSupplierIds = (): string[] => Object.keys(SUPPLIER_ADAPTERS);

/**
 * Check if a supplier ID is supported
 */
export const isSupplierSupported = (supplierId: string): boolean => supplierId in SUPPLIER_ADAPTERS;
