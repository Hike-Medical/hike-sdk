'use client';

import { SimpleGrid, Skeleton, Text } from '@mantine/core';
import { ReactNode } from 'react';

export interface ProductCardGridProps<T> {
  products: T[];
  columns?: { base?: number; sm?: number; md?: number; lg?: number };
  renderCard: (product: T, onSelect: () => void) => ReactNode;
  emptyMessage?: string;
  loadingSkeletonCount?: number;
  isLoading?: boolean;
  onProductSelect?: (product: T) => void;
}

export const ProductCardGrid = <T,>({
  products,
  columns = { base: 1, sm: 2, md: 3 },
  renderCard,
  emptyMessage = 'No products found',
  loadingSkeletonCount = 6,
  isLoading = false,
  onProductSelect
}: ProductCardGridProps<T>) => {
  if (isLoading && products.length === 0) {
    return (
      <SimpleGrid cols={columns} spacing="md">
        {Array.from({ length: loadingSkeletonCount }).map((_, i) => (
          <Skeleton key={i} height={250} />
        ))}
      </SimpleGrid>
    );
  }

  if (products.length === 0) {
    return (
      <Text size="sm" ta="center" w="100%" c="gray.6" py="xl">
        {emptyMessage}
      </Text>
    );
  }

  return (
    <SimpleGrid cols={columns} spacing="md">
      {products.map((product, index) => (
        <div key={index}>{renderCard(product, () => onProductSelect?.(product))}</div>
      ))}
    </SimpleGrid>
  );
};
