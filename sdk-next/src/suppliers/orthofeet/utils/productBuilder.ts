import type { CatalogProductExtended } from '@hike/sdk';
import { getProductAttributeDisplay, ORTHOFEET_ATTRIBUTES } from './attributeHelpers';

/**
 * Immutable product data extracted from variant and parent
 */
export interface OrthofeetProduct {
  name: string;
  image: string | null;
  price: number;
  sku: string;
  attributes: {
    style: string;
    color: string;
    size: string;
    width: string;
  };
}

/**
 * Extract variant attributes
 */
const getAttributes = (variant: CatalogProductExtended): OrthofeetProduct['attributes'] => ({
  style: getProductAttributeDisplay(variant, ORTHOFEET_ATTRIBUTES.STYLE_NAME) || '',
  color: getProductAttributeDisplay(variant, ORTHOFEET_ATTRIBUTES.COLOR) || '',
  size: getProductAttributeDisplay(variant, ORTHOFEET_ATTRIBUTES.SIZE) || '',
  width: getProductAttributeDisplay(variant, ORTHOFEET_ATTRIBUTES.WIDTH) || ''
});

/**
 * Create product data from variants array and SKU
 * Returns null if parent or variant cannot be found
 */
export const productBuilder = (productVariants: CatalogProductExtended[], sku: string): OrthofeetProduct | null => {
  const parent = productVariants.find((p) => !p.parentId);
  const variant = productVariants.find((p) => p.sku === sku) || productVariants[0];

  if (!parent || !variant) {
    return null;
  }

  return {
    name: variant.name || parent.name,
    image: variant.image || parent.image,
    price: variant.price ?? parent.price ?? 0,
    sku: variant.sku || '',
    attributes: getAttributes(variant)
  };
};
