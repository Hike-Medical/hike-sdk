'use client';

import { formatCurrency, getColorHex } from '@hike/sdk';
import { useOrthofeetInventoryBySku, useOrthofeetProductStyleVariants } from '@hike/ui';
import { Badge, Box, Button, Chip, ColorSwatch, Divider, Drawer, Group, Stack, Text, Title, rem } from '@mantine/core';
import { modals } from '@mantine/modals';
import { ReactNode, useMemo, useState } from 'react';
import { ORTHOFEET_ATTRIBUTES, filterProductsByAttributes, getUniqueAttributeValues } from '../utils/attributeHelpers';

interface OrthofeetProductDetailProps {
  style: string;
  price?: number;
  quantity?: string;
  inventoryBuffer?: number;
  enableInventoryCheck?: boolean;
  opened: boolean;
  onAddToCart: (variantSku: string, quantity?: string) => void;
  onClose: () => void;
}

// Internal drawer section component
const DrawerSection = ({
  title,
  children,
  hideDivider = false
}: {
  title: string;
  children: ReactNode;
  hideDivider?: boolean;
}) => (
  <Stack gap="sm">
    <Box px={{ base: 'sm', sm: 'md' }} w="100%">
      <Title size="md" mb="sm">
        {title}
      </Title>
      {children}
    </Box>
    {!hideDivider && <Divider />}
  </Stack>
);

export const OrthofeetProductDetail = ({
  style,
  price,
  quantity,
  inventoryBuffer = 0,
  enableInventoryCheck = false,
  opened,
  onClose,
  onAddToCart
}: OrthofeetProductDetailProps) => {
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [selectedWidth, setSelectedWidth] = useState<string | undefined>();
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [selectedInsertQuantity, setSelectedInsertQuantity] = useState<string | undefined>(quantity || undefined);

  const { data: allProducts } = useOrthofeetProductStyleVariants({
    params: { style },
    enabled: opened && !!style
  });

  const parentProduct = useMemo(() => allProducts?.find((p) => !p.parentId), [allProducts]);
  const variants = useMemo(() => allProducts?.filter((p) => p.parentId) || [], [allProducts]);
  const colors = useMemo(() => getUniqueAttributeValues(variants, ORTHOFEET_ATTRIBUTES.COLOR), [variants]);

  // Filter variants based on color selection
  const filteredByColor = useMemo(
    () =>
      selectedColor ? filterProductsByAttributes(variants, { [ORTHOFEET_ATTRIBUTES.COLOR]: selectedColor }) : variants,
    [variants, selectedColor]
  );

  // Filter variants based on color and width
  const filteredByColorWidth = useMemo(
    () =>
      selectedWidth
        ? filterProductsByAttributes(filteredByColor, { [ORTHOFEET_ATTRIBUTES.WIDTH]: selectedWidth })
        : filteredByColor,
    [filteredByColor, selectedWidth]
  );

  // Get available widths from color-filtered variants
  const widths = useMemo(
    () => getUniqueAttributeValues(filteredByColor, ORTHOFEET_ATTRIBUTES.WIDTH),
    [filteredByColor]
  );

  // Get available sizes from color+width-filtered variants
  const sizes = useMemo(
    () => getUniqueAttributeValues(filteredByColorWidth, ORTHOFEET_ATTRIBUTES.SIZE),
    [filteredByColorWidth]
  );

  // Find current variant based on all selections
  const currentVariant = useMemo(
    () =>
      filterProductsByAttributes(variants, {
        [ORTHOFEET_ATTRIBUTES.COLOR]: selectedColor,
        [ORTHOFEET_ATTRIBUTES.WIDTH]: selectedWidth,
        [ORTHOFEET_ATTRIBUTES.SIZE]: selectedSize
      })[0],
    [variants, selectedColor, selectedWidth, selectedSize]
  );

  const currentVariantSku = currentVariant?.sku || '';

  // Only check inventory when all selections are complete
  const isFullySelected = !!(selectedColor && selectedWidth && selectedSize);

  const {
    data: inventory,
    isLoading: inventoryLoading,
    isError: inventoryError
  } = useOrthofeetInventoryBySku({
    sku: currentVariantSku,
    enabled: !!currentVariantSku && enableInventoryCheck && isFullySelected
  });

  const inventoryQuantity = inventory?.products[currentVariantSku]?.quantity ?? 0;
  const isInStock = inventoryQuantity > inventoryBuffer;

  const handleColorChange = (value: string) => {
    setSelectedColor(value);
    setSelectedWidth(undefined);
    setSelectedSize(undefined);
  };

  const handleWidthChange = (value: string) => {
    setSelectedWidth(value);
    setSelectedSize(undefined);
  };

  const handleSizeChange = (value: string) => {
    setSelectedSize(value);
  };

  const addShoeToOrder = () => {
    if (!currentVariant || !selectedColor || !selectedWidth || !selectedSize) {
      modals.openConfirmModal({
        title: 'Missing Information',
        children: <Text size="sm">Please ensure you have selected all the required options.</Text>,
        labels: {
          confirm: 'OK',
          cancel: 'Cancel'
        }
      });
      return;
    }

    const variantSku = currentVariant.sku;
    if (!variantSku) {
      return;
    }

    const insertQuantity = price ? selectedInsertQuantity : undefined;
    onAddToCart(variantSku, insertQuantity);
    onClose();
  };

  const productPrice = parentProduct?.price ?? currentVariant?.price ?? 0;
  const showOutOfStock = enableInventoryCheck && isFullySelected && !inventoryLoading && !inventoryError && !isInStock;
  const isButtonDisabled =
    !isFullySelected || (enableInventoryCheck && isFullySelected && !inventoryLoading && !isInStock);

  return (
    <Drawer.Root position="bottom" size="90dvh" opened={opened} onClose={onClose}>
      <Drawer.Overlay />
      <Drawer.Content>
        <Stack px={{ base: 'sm', sm: 'lg' }} py={{ base: 'sm', sm: 'lg' }} gap="sm">
          <Group justify="space-between" wrap="nowrap">
            <Drawer.CloseButton size="lg" />
            <Drawer.Title
              ta="center"
              fw="600"
              c="gray.8"
              style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            >
              {parentProduct?.name || 'Shoe Specifications'}
            </Drawer.Title>
            {showOutOfStock ? (
              <Badge variant="light" color="red">
                Out of stock
              </Badge>
            ) : (
              <Button
                size="sm"
                color="blue"
                variant="outline"
                onClick={addShoeToOrder}
                loading={inventoryLoading}
                disabled={isButtonDisabled || inventoryLoading}
              >
                Add Pair
              </Button>
            )}
          </Group>
          <Divider color="gray.3" />
        </Stack>
        <Drawer.Body p="0" pb={{ base: 'xl', sm: '0' }}>
          <Stack>
            {/* Price Display - Only show when variant is fully selected */}
            {currentVariantSku && selectedColor && selectedWidth && selectedSize && (
              <DrawerSection title="Price">
                {selectedInsertQuantity && price ? (
                  <Stack gap="xs">
                    <Text size="sm" fw="500">
                      Shoe Price: {formatCurrency(productPrice)}
                    </Text>
                    <Text size="sm" fw="500">
                      Insert Price: {formatCurrency((price / 100) * Number(selectedInsertQuantity))}
                    </Text>
                    <Text size="md" fw="600">
                      Total Price: {formatCurrency(productPrice + (price / 100) * Number(selectedInsertQuantity))}
                    </Text>
                  </Stack>
                ) : (
                  <Text size="md" fw="600">
                    {formatCurrency(productPrice)}
                  </Text>
                )}
              </DrawerSection>
            )}

            {/* Color Selector */}
            <DrawerSection title="Color">
              <Chip.Group multiple={false} value={selectedColor} onChange={handleColorChange}>
                <Group justify="flex-start" gap="sm">
                  {colors.map((color) => {
                    const colorHex = getColorHex(color);
                    const swatchColor = colorHex || color || 'gray';

                    return (
                      <Chip key={color} value={color}>
                        <Group gap="xs">
                          <ColorSwatch size={rem(15)} color={swatchColor} />
                          {color}
                        </Group>
                      </Chip>
                    );
                  })}
                </Group>
              </Chip.Group>
            </DrawerSection>

            {/* Width Selector */}
            <DrawerSection title="Width">
              {selectedColor ? (
                <Chip.Group key={selectedColor} multiple={false} value={selectedWidth} onChange={handleWidthChange}>
                  <Group justify="flex-start" gap="sm">
                    {widths.map((width) => (
                      <Chip key={width} value={width}>
                        {width}
                      </Chip>
                    ))}
                  </Group>
                </Chip.Group>
              ) : (
                <Text size="sm" c="dimmed">
                  Please select a color first
                </Text>
              )}
            </DrawerSection>

            {/* Size Selector */}
            <DrawerSection title="Shoe Sizes (US)" hideDivider>
              {selectedWidth ? (
                <Chip.Group
                  key={`${selectedColor}-${selectedWidth}`}
                  multiple={false}
                  value={selectedSize}
                  onChange={handleSizeChange}
                >
                  <Group justify="flex-start" gap="sm">
                    {sizes
                      .sort((a, b) => parseFloat(a) - parseFloat(b))
                      .map((size) => (
                        <Chip key={size} value={size}>
                          {size}
                        </Chip>
                      ))}
                  </Group>
                </Chip.Group>
              ) : (
                <Text size="sm" c="dimmed">
                  Please select width first
                </Text>
              )}
            </DrawerSection>

            {/* Insert Quantity Selector */}
            {!!price && (
              <DrawerSection title="Prefab Insert Quantity">
                <Chip.Group
                  multiple={false}
                  value={selectedInsertQuantity?.toString() ?? ''}
                  onChange={(value) => {
                    setSelectedInsertQuantity(value === selectedInsertQuantity ? undefined : value);
                  }}
                >
                  <Group justify="flex-start" gap="sm">
                    {[1, 2, 3].map((qty) => (
                      <Chip key={qty} value={qty.toString()}>
                        {qty}
                      </Chip>
                    ))}
                  </Group>
                </Chip.Group>
              </DrawerSection>
            )}
          </Stack>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
};
