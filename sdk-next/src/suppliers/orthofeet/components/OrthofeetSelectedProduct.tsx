'use client';

import { formatCurrency } from '@hike/sdk';
import { usePreferences } from '@hike/ui';
import { Alert, Badge, Button, Group, Image, Paper, Stack, Text, useMantineTheme } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import type { OrthofeetProduct } from '../utils/productBuilder';

export interface OrthofeetSelectedProductProps {
  product: OrthofeetProduct;
  prefabInsertPrice?: number;
  prefabInsertQuantity?: string;
  onEdit: () => void;
  onRemove: () => void;
}

export const OrthofeetSelectedProduct = ({
  product,
  prefabInsertPrice,
  prefabInsertQuantity,
  onEdit,
  onRemove
}: OrthofeetSelectedProductProps) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const theme = useMantineTheme();
  const tShared = useTranslations('shared');
  const t = useTranslations('suppliers.orthofeet.selectedProduct');
  const { data: preferences } = usePreferences();
  // Destructure product data
  const { name: productName, image: productImage, price: productPrice, attributes } = product;
  const { size: variantSize, color: variantColor, width: variantWidth } = attributes;

  // Calculate prices
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
      onConfirm: () => {
        setIsRemoving(true);
        onRemove();
      }
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

            {!preferences?.pricing?.removeShoeCatalogPricing &&
              (insertPrice > 0 ? (
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
              ))}

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
              <Button onClick={onEdit} variant="light" disabled={isRemoving}>
                {t('editPair')}
              </Button>
              <Button color="red" variant="light" onClick={handleRemoveClick} loading={isRemoving}>
                {tShared('action.remove')}
              </Button>
            </Group>
          </Stack>
        </Group>
      </Paper>
    </Stack>
  );
};
