'use client';

import { formatCurrency } from '@hike/sdk';
import { useCatalogProducts } from '@hike/ui';
import { Alert, Badge, Group, Loader, Paper, Stack, Text, useMantineTheme } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ORTHOFEET_ATTRIBUTES, getProductAttributeDisplay } from '../utils/attributeHelpers';

export interface OrthofeetReviewProps {
  sku: string;
  supplierId: string;
}

export const OrthofeetReview = ({ sku, supplierId }: OrthofeetReviewProps) => {
  const theme = useMantineTheme();
  const t = useTranslations('components.orthofeet.review');

  const { data: orthofeetProduct, isPending: isOrthofeetProductPending } = useCatalogProducts({
    params: {
      term: sku,
      includeVariants: true,
      filter: { supplierId }
    },
    enabled: !!supplierId && !!sku
  });

  // Find the variant - it could be directly in the results or in a parent's children array
  const selectedVariant = orthofeetProduct?.data?.find((product) => product.sku === sku);

  // Find the parent product - either it has children or we need to find by parentId
  const selectedProduct = selectedVariant?.parentId
    ? orthofeetProduct?.data?.find((product) => product.id === selectedVariant.parentId)
    : orthofeetProduct?.data?.find((product) => product.children?.some((variant) => variant.sku === sku));

  if (isOrthofeetProductPending) {
    return <Loader />;
  }

  if (!selectedProduct || !selectedVariant) {
    return (
      <Alert title={t('notFoundTitle')}>
        {t.rich('notFoundMessage', {
          sku,
          b: (chunks) => <strong>{chunks}</strong>
        })}
      </Alert>
    );
  }

  // Extract attributes from the variant (with description fallback to value)
  const color = getProductAttributeDisplay(selectedVariant, ORTHOFEET_ATTRIBUTES.COLOR);
  const size = getProductAttributeDisplay(selectedVariant, ORTHOFEET_ATTRIBUTES.SIZE);
  const width = getProductAttributeDisplay(selectedVariant, ORTHOFEET_ATTRIBUTES.WIDTH);

  return (
    <Paper p="md" withBorder>
      <Stack gap="xs">
        <Image
          src={selectedProduct?.image || ''}
          alt={selectedProduct.name}
          width={600}
          height={400}
          style={{
            backgroundColor: theme.colors.gray[3],
            borderRadius: theme.radius.lg,
            objectFit: 'cover'
          }}
        />
        <Text size="md" fw="500">
          {selectedProduct.name}
        </Text>
        <Text size="md" fw="600">
          {t('priceLabel')}: {formatCurrency(selectedProduct.price ?? selectedProduct.parent?.price ?? 0)}
        </Text>
        <Group>
          {size && (
            <Badge variant="light" color="dark">
              {t('sizeLabel')}: {size}
            </Badge>
          )}
          {color && (
            <Badge variant="light" color="dark">
              {t('colorLabel')}: {color}
            </Badge>
          )}
          {width && (
            <Badge variant="light" color="dark">
              {t('widthLabel')}: {width}
            </Badge>
          )}
        </Group>
      </Stack>
    </Paper>
  );
};
