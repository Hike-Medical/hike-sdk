import { CatalogProductExtended } from '@hike/sdk';

// Orthofeet-specific attribute keys
export const ORTHOFEET_ATTRIBUTES = {
  STYLE_NAME: 'style_name',
  CLASS: 'class',
  GENDER: 'gender',
  COLOR: 'color',
  SIZE: 'size',
  WIDTH: 'width',
  FEATURE: 'feature',
  MATERIAL: 'material',
  CLOSURE: 'closure'
} as const;

/**
 * Get the value of an attribute by its key
 */
export const getProductAttributeValue = (product: CatalogProductExtended, attributeKey: string): string | undefined => {
  const attr = product.attributes?.find(
    (a) => a.type === 'TEXT' && a.key?.toLowerCase() === attributeKey.toLowerCase()
  );
  return attr?.value?.trim();
};

/**
 * Get the display label for an attribute (description only, or undefined)
 * Caller should fallback to value if this returns undefined
 */
export const getProductAttributeLabel = (product: CatalogProductExtended, attributeKey: string): string | undefined => {
  const attr = product.attributes?.find(
    (a) => a.type === 'TEXT' && a.key?.toLowerCase() === attributeKey.toLowerCase()
  );

  if (!attr) {
    return undefined;
  }

  const description = attr.description?.trim();
  return description || undefined;
};

/**
 * Get the display text for an attribute (description with fallback to value)
 * This is the primary function to use for displaying attributes in UI
 */
export const getProductAttributeDisplay = (
  product: CatalogProductExtended,
  attributeKey: string
): string | undefined => {
  const value = getProductAttributeValue(product, attributeKey);
  const label = getProductAttributeLabel(product, attributeKey);
  return label || value;
};

/**
 * Represents an attribute option with both value and display label
 */
export interface AttributeOption {
  value: string;
  label: string;
}

/**
 * Get unique attribute values across multiple products
 */
export const getUniqueAttributeValues = (products: CatalogProductExtended[], attributeKey: string): string[] => {
  const values = new Set<string>();

  products.forEach((product) => {
    const value = getProductAttributeValue(product, attributeKey);
    if (value) {
      values.add(value);
    }
  });

  return Array.from(values).sort();
};

/**
 * Get unique attribute options (value + label) across multiple products
 * Returns options with display labels (description with fallback to value)
 */
export const getUniqueAttributeOptions = (
  products: CatalogProductExtended[],
  attributeKey: string
): AttributeOption[] => {
  const optionsMap = new Map<string, string>();

  products.forEach((product) => {
    const value = getProductAttributeValue(product, attributeKey);
    if (value && !optionsMap.has(value)) {
      const display = getProductAttributeDisplay(product, attributeKey) || value;
      optionsMap.set(value, display);
    }
  });

  // Convert to array and sort by label
  return Array.from(optionsMap.entries())
    .map(([value, label]) => ({ value, label }))
    .sort((a, b) => a.label.localeCompare(b.label));
};

/**
 * Filter products by multiple attribute key-value pairs
 */
export const filterProductsByAttributes = (
  products: CatalogProductExtended[],
  filters: Record<string, string | undefined>
): CatalogProductExtended[] =>
  products.filter((product) =>
    Object.entries(filters).every(([attrKey, filterValue]) => {
      if (!filterValue) {
        return true;
      }

      const productValue = getProductAttributeValue(product, attrKey);
      return productValue?.toLowerCase() === filterValue.toLowerCase();
    })
  );
