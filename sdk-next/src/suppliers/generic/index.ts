// Components
export { GenericCatalog } from './components/GenericCatalog';
export type { GenericCatalogProps } from './components/GenericCatalog';

export { GenericProductCard } from './components/GenericProductCard';
export type { GenericProductCardProps } from './components/GenericProductCard';

export { GenericProductDetail } from './components/GenericProductDetail';
export type { GenericProductDetailProps } from './components/GenericProductDetail';

export { GenericSelectedProduct } from './components/GenericSelectedProduct';
export type { GenericSelectedProductProps } from './components/GenericSelectedProduct';

// Hooks
export { useGenericAdapter } from './hooks/useGenericAdapter';

// Types
export { hasVariants, isParentProduct } from './types';
export type { GenericProduct, VariantSelectionState } from './types';

// Utilities
export {
  formatVariantOption,
  getAttributeDisplay,
  getAttributeValue,
  getVariantAttributes,
  getVariantCount
} from './utils/productHelpers';
