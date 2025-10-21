'use client';

import { CatalogProductExtended } from '@hike/sdk';
import { SimpleGrid, Skeleton } from '@mantine/core';
import { ORTHOFEET_ATTRIBUTES, getProductAttributeValue } from '../utils/attributeHelpers';
import { OrthofeetProductCard } from './OrthofeetProductCard';

export interface OrthofeetProductGridProps {
  products: CatalogProductExtended[];
  isLoading: boolean;
  multiplier: number;
  onProductSelect: (styleNameValue: string, product: CatalogProductExtended) => void;
}

export function OrthofeetProductGrid({ products, isLoading, multiplier, onProductSelect }: OrthofeetProductGridProps) {
  if (isLoading) {
    return (
      <SimpleGrid
        cols={{
          base: 1,
          sm: 2,
          md: 3,
          lg: 4
        }}
        spacing="md"
        verticalSpacing="md"
      >
        {Array.from({ length: 8 }, (_, index) => (
          <Skeleton key={`skeleton-${index}`} w="100%" height={250} />
        ))}
      </SimpleGrid>
    );
  }

  return (
    <SimpleGrid
      cols={{
        base: 1,
        sm: 2,
        md: 3,
        lg: 4
      }}
      spacing="md"
      verticalSpacing="md"
    >
      {products.map((product) => {
        const styleNameValue = getProductAttributeValue(product, ORTHOFEET_ATTRIBUTES.STYLE_NAME);

        if (!styleNameValue) {
          return null;
        }

        return (
          <OrthofeetProductCard
            key={product.id}
            product={product}
            multiplier={multiplier}
            onSelect={() => onProductSelect(styleNameValue, product)}
          />
        );
      })}
    </SimpleGrid>
  );
}
