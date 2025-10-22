'use client';

import { formatCurrency } from '@hike/sdk';
import { useOrthofeetProductStyleVariants } from '@hike/ui';
import { Alert, Badge, Button, Group, Image, LoadingOverlay, Paper, Stack, Text, useMantineTheme } from '@mantine/core';
import { modals } from '@mantine/modals';
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
      <Alert color="red" title="Error loading product">
        Could not load shoe details. Please try again.
      </Alert>
    );
  }

  if (!productVariants?.length) {
    return (
      <Alert color="yellow" title="Product not found">
        The selected shoe could not be found. Please select another shoe.
      </Alert>
    );
  }

  const parentProduct = productVariants.find((p) => !p.parentId);
  const selectedVariant = productVariants.find((p) => p.sku === sku);

  if (!parentProduct || !selectedVariant) {
    return (
      <Alert color="yellow" title="Product variant not found">
        Could not load details for this shoe variant. The SKU may be invalid.
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
  const insertPrice = price && quantity ? (price / 100) * Number(quantity) : 0;
  const totalPrice = productPrice + insertPrice;

  const handleRemoveClick = () => {
    modals.openConfirmModal({
      title: 'Remove shoe from order',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to remove <strong>{productName}</strong> from the order?
        </Text>
      ),
      labels: { cancel: 'Cancel', confirm: 'Remove' },
      confirmProps: { color: 'red' },
      onConfirm: onRemove
    });
  };

  return (
    <Stack gap="md">
      <Alert color="green" title="Shoe added to order" />
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
                  Shoe Price: {formatCurrency(productPrice)}
                </Text>
                <Text size="sm" fw="500">
                  Insert Price: {formatCurrency(insertPrice)}
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
              {!!variantSize && (
                <Badge variant="light" color="dark">
                  Size: {variantSize}
                </Badge>
              )}
              {!!variantColor && (
                <Badge variant="light" color="dark">
                  Color: {variantColor}
                </Badge>
              )}
              {!!variantWidth && (
                <Badge variant="light" color="dark">
                  Width: {variantWidth}
                </Badge>
              )}
              {!!quantity && (
                <Badge variant="light" color="dark">
                  Prefab Insert Quantity: {quantity}
                </Badge>
              )}
            </Group>

            <Group pt="md">
              <Button onClick={() => styleName && onEdit(styleName)} variant="light">
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
