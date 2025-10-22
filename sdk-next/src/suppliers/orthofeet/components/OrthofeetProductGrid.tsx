'use client';

import { OrthofeetProductStyle } from '@hike/sdk';
import { SimpleGrid, Skeleton } from '@mantine/core';
import { OrthofeetProductCard } from './OrthofeetProductCard';

export interface OrthofeetProductGridProps {
  products: OrthofeetProductStyle[];
  isLoading: boolean;
  onProductSelect: (productStyle: OrthofeetProductStyle) => void;
}

export const OrthofeetProductGrid = ({ products, isLoading, onProductSelect }: OrthofeetProductGridProps) =>
  isLoading ? (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="md" verticalSpacing="md">
      {Array.from({ length: 12 }, (_, index) => (
        <Skeleton key={`skeleton-${index}`} w="100%" height={250} />
      ))}
    </SimpleGrid>
  ) : (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="md" verticalSpacing="md">
      {products.map((productStyle) => (
        <OrthofeetProductCard
          key={productStyle.value}
          productStyle={productStyle}
          onSelect={() => onProductSelect(productStyle)}
        />
      ))}
    </SimpleGrid>
  );
