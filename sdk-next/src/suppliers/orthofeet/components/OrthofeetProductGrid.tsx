'use client';

import { OrthofeetProductStyle } from '@hike/sdk';
import { SimpleGrid, Skeleton } from '@mantine/core';
import { OrthofeetProductCard } from './OrthofeetProductCard';

export interface OrthofeetProductGridProps {
  products: OrthofeetProductStyle[];
  multiplier: number;
  isLoading: boolean;
  onProductSelect: (productStyle: OrthofeetProductStyle) => void;
}

export const OrthofeetProductGrid = ({
  products,
  multiplier,
  isLoading,
  onProductSelect
}: OrthofeetProductGridProps) =>
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
          multiplier={multiplier}
          onSelect={() => onProductSelect(productStyle)}
        />
      ))}
    </SimpleGrid>
  );
