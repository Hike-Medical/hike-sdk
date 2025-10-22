'use client';

import { formatCurrency } from '@hike/sdk';
import { useOrthofeetProductStyleVariants } from '@hike/ui';
import { Alert, Badge, Button, Group, Image, Paper, Stack, Text, useMantineTheme } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useMemo } from 'react';
import { getProductAttributeDisplay, ORTHOFEET_ATTRIBUTES } from '../utils/attributeHelpers';

export interface OrthofeetSelectedProductProps {
  sku: string;
  price?: number;
  quantity?: string;
  onEdit: (styleName: string) => void;
  onRemove: () => void;
}

export const OrthofeetSelectedProduct = ({ sku, price, quantity, onEdit, onRemove }: OrthofeetSelectedProductProps) => {
  const theme = useMantineTheme();

  const { data: productVariants, isLoading } = useOrthofeetProductStyleVariants({
    params: { sku },
    enabled: !!sku
  });

  const parentProduct = useMemo(() => productVariants?.find((p) => !p.parentId), [productVariants]);
  const selectedVariant = useMemo(() => productVariants?.find((p) => p.sku === sku), [productVariants, sku]);
  const productPrice = parentProduct?.price ?? selectedVariant?.price ?? 0;
  const totalPrice = price && quantity ? productPrice + (price / 100) * Number(quantity) : productPrice;

  // Extract variant attributes
  const variantColor = selectedVariant
    ? getProductAttributeDisplay(selectedVariant, ORTHOFEET_ATTRIBUTES.COLOR)
    : undefined;
  const variantSize = selectedVariant
    ? getProductAttributeDisplay(selectedVariant, ORTHOFEET_ATTRIBUTES.SIZE)
    : undefined;
  const variantWidth = selectedVariant
    ? getProductAttributeDisplay(selectedVariant, ORTHOFEET_ATTRIBUTES.WIDTH)
    : undefined;
  const styleName = selectedVariant
    ? getProductAttributeDisplay(selectedVariant, ORTHOFEET_ATTRIBUTES.STYLE_NAME)
    : undefined;

  const handleEditClick = () => {
    if (styleName) {
      onEdit(styleName);
    }
  };

  const handleRemoveClick = () => {
    modals.openConfirmModal({
      title: 'Remove product from order',
      centered: true,
      children: <Text size="sm">Are you sure you want to remove {parentProduct?.name} from the order?</Text>,
      labels: { cancel: 'Cancel', confirm: 'Remove' },
      confirmProps: { color: 'red' },
      onConfirm: onRemove
    });
  };

  if (isLoading || !parentProduct || !selectedVariant) {
    return null;
  }

  return (
    <Stack gap="md">
      <Alert color="green" title="Product added to order" />
      <Paper p="md" withBorder>
        <Group align="flex-start" wrap="nowrap">
          <Image
            src={parentProduct.image || selectedVariant.image}
            alt={parentProduct.name}
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
              {parentProduct.name}
            </Text>

            {quantity && price ? (
              <Stack gap="xs">
                <Text size="sm" fw="500">
                  Shoe Price: {formatCurrency(productPrice)}
                </Text>
                <Text size="sm" fw="500">
                  Insert Price: {formatCurrency((price / 100) * Number(quantity))}
                </Text>
                <Text size="md" fw="600">
                  Total Price: {formatCurrency(totalPrice)}
                </Text>
              </Stack>
            ) : (
              <Text size="md" fw="600">
                Price: {formatCurrency(productPrice)}
              </Text>
            )}

            <Group gap="xs">
              {variantSize && (
                <Badge variant="light" color="dark">
                  Size: {variantSize}
                </Badge>
              )}
              {variantColor && (
                <Badge variant="light" color="dark">
                  Color: {variantColor}
                </Badge>
              )}
              {variantWidth && (
                <Badge variant="light" color="dark">
                  Width: {variantWidth}
                </Badge>
              )}
              {quantity && price && (
                <Badge variant="light" color="dark">
                  Prefab Insert Quantity: {quantity}
                </Badge>
              )}
            </Group>

            <Group pt="md">
              <Button onClick={handleEditClick} variant="light">
                Edit Pair
              </Button>
              <Button color="red" variant="light" onClick={handleRemoveClick}>
                Remove
              </Button>
            </Group>
          </Stack>
        </Group>
      </Paper>
    </Stack>
  );
};
