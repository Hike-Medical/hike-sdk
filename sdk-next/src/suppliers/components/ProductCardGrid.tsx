'use client';

import { SimpleGrid, Skeleton, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';

interface ProductCardGridProps<T> {
  products: T[];
  renderCard: (product: T, onSelect: () => void) => ReactNode;
  isLoading?: boolean;
  onProductSelect?: (product: T) => void;
}

export const ProductCardGrid = <T,>({
  products,
  renderCard,
  isLoading = false,
  onProductSelect
}: ProductCardGridProps<T>) => {
  const t = useTranslations('suppliers');

  if (isLoading && products.length === 0) {
    return (
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} height={250} />
        ))}
      </SimpleGrid>
    );
  }

  if (products.length === 0) {
    return (
      <Text size="sm" ta="center" w="100%" c="gray.6" py="xl">
        {t('noProductsFound')}
      </Text>
    );
  }

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
      {products.map((product, index) => (
        <div key={index}>{renderCard(product, () => onProductSelect?.(product))}</div>
      ))}
    </SimpleGrid>
  );
};
