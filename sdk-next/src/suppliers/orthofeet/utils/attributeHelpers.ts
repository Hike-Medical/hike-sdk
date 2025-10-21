import { CatalogProductExtended } from '@hike/sdk';

// Orthofeet-specific attribute keys
export const ORTHOFEET_ATTRIBUTES = {
  STYLE_NAME: 'style_name',
  CLASS: 'class',
  GENDER: 'gender',
  COLOR: 'color',
  SIZE: 'size',
  WIDTH: 'width'
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
 * Get the display label for an attribute (description or key as fallback)
 */
export const getProductAttributeLabel = (product: CatalogProductExtended, attributeKey: string): string | undefined => {
  const attr = product.attributes?.find(
    (a) => a.type === 'TEXT' && a.key?.toLowerCase() === attributeKey.toLowerCase()
  );

  if (!attr) {
    return undefined;
  }

  const description = attr.description?.trim();
  const key = attr.key?.trim();

  return description || key;
};

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
