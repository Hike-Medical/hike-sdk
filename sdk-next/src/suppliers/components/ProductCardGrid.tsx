'use client';

import { SimpleGrid, Skeleton, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
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
  emptyMessage,
  loadingSkeletonCount = 6,
  isLoading = false,
  onProductSelect
}: ProductCardGridProps<T>) => {
  const t = useTranslations('suppliers');

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
        {emptyMessage ?? t('noProductsFound')}
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
