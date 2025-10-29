'use client';

import { formatCurrency, type CatalogProductExtended } from '@hike/sdk';
import { Badge, Box, Button, Paper, Stack, Text, rem } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export interface GenericProductCardProps {
  product: CatalogProductExtended;
  onSelect: () => void;
}

export const GenericProductCard = ({ product, onSelect }: GenericProductCardProps) => {
  const t = useTranslations('suppliers');
  const tGeneric = useTranslations('suppliers.generic.productCard');
  const imageUrl = product.image || '/images/product-placeholder.png';
  const price = product.price ?? 0;
  const variantCount = product.childrenCount ?? product.children?.length ?? 0;

  return (
    <Paper flex={1} bg="gray.1" p="md" mih={rem(250)} pos="relative">
      {product.featured && (
        <Badge variant="filled" color="green" size="xs" pos="absolute" top={rem(8)} left={rem(8)} style={{ zIndex: 1 }}>
          {t('featured')}
        </Badge>
      )}

      <Box
        style={{
          position: 'relative',
          width: '100%',
          height: rem(180),
          backgroundColor: '#f1f3f5',
          borderRadius: rem(8),
          overflow: 'hidden'
        }}
      >
        <Image src={imageUrl} alt={product.name || ''} fill unoptimized style={{ objectFit: 'contain' }} />
      </Box>

      <Stack pt="sm" gap="xs">
        <Stack justify="space-between" gap="xs">
          <Text size="md" truncate>
            {product.name}
          </Text>
          <Text size="md" fw="600">
            {price > 0 ? formatCurrency(price) : '—'}
          </Text>
        </Stack>

        {variantCount > 0 && (
          <Badge size="sm" variant="light" color="blue">
            {tGeneric(variantCount === 1 ? 'variantCountSingular' : 'variantCount', { count: variantCount })}
          </Badge>
        )}
      </Stack>

      <Button onClick={onSelect} h={rem(50)} size="compact-sm" fullWidth mt="md" variant="light">
        {t('addToOrder')}
      </Button>
    </Paper>
  );
};
