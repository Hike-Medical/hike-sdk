'use client';

import { formatCurrency } from '@hike/sdk';
import { useOrthofeetProductStyleVariants } from '@hike/ui';
import { Alert, Badge, Button, Group, Image, LoadingOverlay, Paper, Stack, Text, useMantineTheme } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useTranslations } from 'next-intl';
import { getProductAttributeDisplay, ORTHOFEET_ATTRIBUTES } from '../utils/attributeHelpers';

export interface OrthofeetSelectedProductProps {
  sku: string;
  prefabInsertPrice?: number;
  prefabInsertQuantity?: string;
  onEdit: (styleName: string) => void;
  onRemove: () => void;
}

export const OrthofeetSelectedProduct = ({
  sku,
  prefabInsertPrice,
  prefabInsertQuantity,
  onEdit,
  onRemove
}: OrthofeetSelectedProductProps) => {
  const theme = useMantineTheme();
  const tShared = useTranslations('shared');
  const t = useTranslations('components.orthofeet.selectedProduct');

  const {
    data: productVariants,
    isLoading,
    isFetching,
    isError
  } = useOrthofeetProductStyleVariants({
    params: { sku },
    enabled: !!sku,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2
  });

  // Show loading during initial fetch or when refetching without data
  if (isLoading || (isFetching && !productVariants)) {
    return (
      <Stack gap="md" pos="relative" mih={200}>
        <LoadingOverlay visible />
      </Stack>
    );
  }

  if (isError) {
    return (
      <Alert color="red" title={t('errorLoadingTitle')}>
        {t('errorLoadingMessage')}
      </Alert>
    );
  }

  if (!productVariants?.length) {
    return (
      <Alert color="yellow" title={t('notFoundTitle')}>
        {t('notFoundMessage')}
      </Alert>
    );
  }

  const parentProduct = productVariants.find((p) => !p.parentId);
  const selectedVariant = productVariants.find((p) => p.sku === sku);

  if (!parentProduct || !selectedVariant) {
    return (
      <Alert color="yellow" title={t('variantNotFoundTitle')}>
        {t('variantNotFoundMessage')}
      </Alert>
    );
  }

  // Extract attributes
  const getAttribute = (key: string) => getProductAttributeDisplay(selectedVariant, key);
  const styleName = getAttribute(ORTHOFEET_ATTRIBUTES.STYLE_NAME);
  const variantColor = getAttribute(ORTHOFEET_ATTRIBUTES.COLOR);
  const variantSize = getAttribute(ORTHOFEET_ATTRIBUTES.SIZE);
  const variantWidth = getAttribute(ORTHOFEET_ATTRIBUTES.WIDTH);

  // Calculate prices
  const productName = selectedVariant.name || parentProduct.name;
  const productImage = selectedVariant.image || parentProduct.image;
  const productPrice = selectedVariant.price ?? parentProduct.price ?? 0;
  const insertPrice =
    prefabInsertPrice && prefabInsertQuantity ? (prefabInsertPrice / 100) * Number(prefabInsertQuantity) : 0;
  const totalPrice = productPrice + insertPrice;

  const handleRemoveClick = () => {
    modals.openConfirmModal({
      title: t('removeConfirmTitle'),
      centered: true,
      children: (
        <Text size="sm">
          {t.rich('removeConfirmMessage', {
            productName,
            b: (chunks) => <strong>{chunks}</strong>
          })}
        </Text>
      ),
      labels: { cancel: tShared('action.cancel'), confirm: tShared('action.remove') },
      confirmProps: { color: 'red' },
      onConfirm: onRemove
    });
  };

  return (
    <Stack gap="md">
      <Alert color="green" title={t('addedTitle')} />
      <Paper p="md" withBorder>
        <Group align="flex-start" wrap="nowrap">
          <Image
            src={productImage}
            alt={productName}
            w={200}
            h={200}
            fit="contain"
            style={{
              backgroundColor: theme.colors.gray[3],
              borderRadius: theme.radius.lg
            }}
          />
          <Stack flex={1} gap="xs">
            <Text size="lg" fw="600">
              {productName}
            </Text>

            {insertPrice > 0 ? (
              <Stack gap="xs">
                <Text size="sm" fw="500">
                  {t('shoePrice')}: {formatCurrency(productPrice)}
                </Text>
                <Text size="sm" fw="500">
                  {t('insertPrice')}: {formatCurrency(insertPrice)}
                </Text>
                <Text size="md" fw="600">
                  {t('totalPrice')}: {formatCurrency(totalPrice)}
                </Text>
              </Stack>
            ) : (
              <Text size="md" fw="600">
                {tShared('label.price')}: {formatCurrency(productPrice)}
              </Text>
            )}

            <Group gap="xs">
              {!!variantSize && (
                <Badge variant="light" color="dark">
                  {tShared('label.size')}: {variantSize}
                </Badge>
              )}
              {!!variantColor && (
                <Badge variant="light" color="dark">
                  {tShared('label.color')}: {variantColor}
                </Badge>
              )}
              {!!variantWidth && (
                <Badge variant="light" color="dark">
                  {tShared('label.width')}: {variantWidth}
                </Badge>
              )}
              {!!prefabInsertQuantity && (
                <Badge variant="light" color="dark">
                  {t('prefabQuantityLabel')}: {prefabInsertQuantity}
                </Badge>
              )}
            </Group>

            <Group pt="md">
              <Button onClick={() => styleName && onEdit(styleName)} variant="light">
                {t('editPair')}
              </Button>
              <Button color="red" variant="light" onClick={handleRemoveClick}>
                {tShared('action.remove')}
              </Button>
            </Group>
          </Stack>
        </Group>
      </Paper>
    </Stack>
  );
};
