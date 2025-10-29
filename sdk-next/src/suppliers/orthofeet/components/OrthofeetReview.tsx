'use client';

import { formatCurrency } from '@hike/sdk';
import { useOrthofeetProductStyleVariants } from '@hike/ui';
import { Alert, Badge, Group, Image, LoadingOverlay, Paper, Stack, Text, useMantineTheme } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { productBuilder } from '../utils/productBuilder';

export interface OrthofeetReviewProps {
  sku: string;
}

export const OrthofeetReview = ({ sku }: OrthofeetReviewProps) => {
  const theme = useMantineTheme();
  const tShared = useTranslations('shared');
  const t = useTranslations('suppliers.orthofeet.review');

  const {
    data: productVariants,
    isLoading,
    isFetching,
    isError
  } = useOrthofeetProductStyleVariants({
    params: { sku },
    enabled: !!sku,
    staleTime: 5 * 60 * 1000,
    retry: 2
  });

  // Show loading
  if (isLoading || (isFetching && !productVariants)) {
    return (
      <Stack gap="md" pos="relative" mih={200}>
        <LoadingOverlay visible />
      </Stack>
    );
  }

  // Show error
  if (isError) {
    return (
      <Alert color="red" title={t('errorLoadingTitle')}>
        {t('errorLoadingMessage')}
      </Alert>
    );
  }

  // Show not found
  if (!productVariants || productVariants.length === 0) {
    return (
      <Alert color="yellow" title={t('notFoundTitle')}>
        {t.rich('notFoundMessage', {
          sku,
          b: (chunks) => <strong>{chunks}</strong>
        })}
      </Alert>
    );
  }

  // Extract product data
  const product = productBuilder(productVariants, sku);

  if (!product) {
    return (
      <Alert color="yellow" title={t('variantNotFoundTitle')}>
        {t('variantNotFoundMessage')}
      </Alert>
    );
  }

  // Destructure product data
  const { name: productName, image: productImage, price: productPrice, attributes } = product;
  const { size: variantSize, color: variantColor, width: variantWidth } = attributes;

  // Helper to render badges
  const renderBadge = (label: string, value: string) => (
    <Badge key={label} variant="light" color="dark">
      {label}: {value}
    </Badge>
  );

  return (
    <Paper p="md" withBorder radius="md" maw={400}>
      <Stack gap="sm">
        {/* Product Image */}
        {productImage && (
          <Image
            src={productImage}
            alt={productName}
            radius="sm"
            h="auto"
            w="100%"
            fit="contain"
            style={{ backgroundColor: theme.colors.gray[0], maxHeight: 200 }}
          />
        )}

        {/* Product Name */}
        <Text size="md" fw={600} lineClamp={2}>
          {productName}
        </Text>

        {/* Variant Attributes */}
        <Group gap="xs" wrap="wrap">
          {variantSize && renderBadge(tShared('label.size'), variantSize)}
          {variantColor && renderBadge(tShared('label.color'), variantColor)}
          {variantWidth && renderBadge(tShared('label.width'), variantWidth)}
        </Group>

        {/* Price */}
        <Text size="md" fw={600} c="blue">
          {formatCurrency(productPrice)}
        </Text>
      </Stack>
    </Paper>
  );
};
