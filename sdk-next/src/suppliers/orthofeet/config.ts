/**
 * Orthofeet supplier ID (from database)
 */
export const ORTHOFEET_SUPPLIER_ID = '4ec6c88f-1804-4008-9fab-846e390f27fc';

/**
 * Inventory buffer - minimum quantity threshold before showing out of stock
 */
export const ORTHOFEET_INVENTORY_BUFFER = 5;

/**
 * Form field keys used in form submissions.
 * These map to the actual field names in the form schema.
 */
export const ORTHOFEET_FORM_FIELDS = {
  sku: 'orderOrthofeetFootwearSKU',
  description: 'orderOrthofeetFootwearDescription',
  heading: 'orderOrthofeetFootwearHeading',
  prefabQuantity: 'orderOrthofeetPrefabQuantity'
} as const;

export type OrthofeetFormFields = typeof ORTHOFEET_FORM_FIELDS;
