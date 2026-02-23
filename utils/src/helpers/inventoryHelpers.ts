import type { CatalogProductAttribute } from '@hike/types';

const MAX_PAIRS_PER_WORK_ORDER = 3;
const MAX_PAIRS_ALLOWED = 12;
const INVENTORY_DELIVERY_BUSINESS_DAYS = 4;

const GCODE_FILE_KEY = 'gcodeFileKey';
const PRINTER_TYPE_KEY = 'printerType';
const FORM_FIELDS_KEY = 'formFields';

export const INVENTORY_CONSTANTS = {
  MAX_PAIRS_PER_WORK_ORDER,
  MAX_PAIRS_ALLOWED,
  INVENTORY_DELIVERY_BUSINESS_DAYS,
  GCODE_FILE_KEY,
  PRINTER_TYPE_KEY,
  FORM_FIELDS_KEY,
  INVENTORY_PATIENT_FIRST_NAME: 'Hike',
  INVENTORY_PATIENT_LAST_NAME: 'Inventory'
} as const;

/**
 * Splits a total pair count into batches respecting the max per work order constraint.
 * E.g. 10 pairs with max 3 → [3, 3, 3, 1]
 */
export function splitIntoBatches(totalPairs: number, maxPerBatch: number = MAX_PAIRS_PER_WORK_ORDER): number[] {
  if (totalPairs <= 0 || maxPerBatch <= 0) {
    return [];
  }

  const fullBatches = Math.floor(totalPairs / maxPerBatch);
  const remainder = totalPairs % maxPerBatch;

  return [...Array.from({ length: fullBatches }, () => maxPerBatch), ...(remainder > 0 ? [remainder] : [])];
}

/**
 * Extracts the GCODE S3 file key from a catalog product's attributes.
 */
export function extractGcodeFileKey(attributes: Pick<CatalogProductAttribute, 'key' | 'value'>[]): string | null {
  const attr = attributes.find((a) => a.key === GCODE_FILE_KEY);
  return attr?.value ?? null;
}

/**
 * Extracts the printer type metadata from a catalog product's attributes.
 * Returns it as an object suitable for asset metadata.
 */
export function extractGcodeMetadata(
  attributes: Pick<CatalogProductAttribute, 'key' | 'value'>[]
): Record<string, string> {
  const attr = attributes.find((a) => a.key === PRINTER_TYPE_KEY);
  if (!attr) {
    return {};
  }
  return { printerType: attr.value };
}

/**
 * Extracts form field key-value pairs from a catalog product's attributes.
 * The form fields attribute stores a JSON string of field mappings.
 */
export function extractFormFields(
  attributes: Pick<CatalogProductAttribute, 'key' | 'value'>[]
): Record<string, string> {
  const attr = attributes.find((a) => a.key === FORM_FIELDS_KEY);
  if (!attr) {
    return {};
  }

  try {
    const parsed = JSON.parse(attr.value);
    if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
      return parsed as Record<string, string>;
    }
    return {};
  } catch {
    return {};
  }
}

/**
 * Builds the form submission data by merging the catalog product's form fields
 * with the order quantity.
 */
export function buildFormSubmissionData(
  formFields: Record<string, string>,
  orderQuantity: number
): Record<string, unknown> {
  return { ...formFields, orderQuantity };
}
