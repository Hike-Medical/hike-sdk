import type {
  CatalogCategory,
  CatalogProduct,
  CatalogProductAttribute,
  CatalogProductVariant,
  CatalogVendor
} from '../../prisma';

export type CatalogProductExtended = CatalogProduct & {
  attributes: CatalogProductAttribute[];
  variants: CatalogProductVariant[];
  categories: CatalogCategory[];
  vendors: CatalogVendor[];
};
