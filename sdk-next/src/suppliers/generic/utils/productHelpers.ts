import { formatCurrency, type CatalogProductAttribute, type CatalogProductExtended } from '@hike/sdk';

/**
 * Get the count of child variants for a product
 */
export const getVariantCount = (product: CatalogProductExtended): number => product.children?.length ?? 0;

/**
 * Format a variant for display in a Select dropdown
 * Format: "Name" or "Name - $Price" if price differs from parent
 */
export const formatVariantOption = (
  variant: CatalogProductExtended,
  parentPrice?: number
): { value: string; label: string } => {
  const name = variant.name || variant.sku || 'Unnamed Variant';
  const price = variant.price ?? 0;
  const showPrice = parentPrice !== undefined && price !== parentPrice && price > 0;

  const label = showPrice ? `${name} - ${formatCurrency(price)}` : name;

  return {
    value: variant.id,
    label
  };
};

/**
 * Extract displayable attributes from a variant
 * Returns array of key-value pairs for display
 */
export const getVariantAttributes = (
  variant: CatalogProductExtended
): { key: string; value: string; description?: string }[] => {
  if (!variant.attributes || variant.attributes.length === 0) {
    return [];
  }

  return variant.attributes
    .filter((attr) => attr.type === 'TEXT' && attr.value)
    .map((attr) => ({
      key: attr.key || 'attribute',
      value: attr.value || '',
      description: attr.description || undefined
    }));
};

/**
 * Get attribute value by key
 */
export const getAttributeValue = (product: CatalogProductExtended, attributeKey: string): string | undefined =>
  product.attributes
    ?.find((a: CatalogProductAttribute) => a.type === 'TEXT' && a.key?.toLowerCase() === attributeKey.toLowerCase())
    ?.value?.trim();

/**
 * Get attribute display text (description with fallback to value)
 */
export const getAttributeDisplay = (product: CatalogProductExtended, attributeKey: string): string | undefined => {
  const attr = product.attributes?.find(
    (a: CatalogProductAttribute) => a.type === 'TEXT' && a.key?.toLowerCase() === attributeKey.toLowerCase()
  );

  if (!attr) {
    return undefined;
  }

  const description = attr.description?.trim();
  const value = attr.value?.trim();

  return description || value || undefined;
};
