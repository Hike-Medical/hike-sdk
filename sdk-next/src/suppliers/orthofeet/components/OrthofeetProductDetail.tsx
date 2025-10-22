'use client';

import { formatCurrency, getColorHex } from '@hike/sdk';
import { useOrthofeetInventoryBySku, useOrthofeetProductStyleVariants } from '@hike/ui';
import { Badge, Box, Button, Chip, ColorSwatch, Divider, Drawer, Group, Stack, Text, Title, rem } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useTranslations } from 'next-intl';
import { ReactNode, useMemo, useState } from 'react';
import { ORTHOFEET_ATTRIBUTES, filterProductsByAttributes, getUniqueAttributeValues } from '../utils/attributeHelpers';

interface OrthofeetProductDetailProps {
  style: string;
  price?: number;
  quantity?: string;
  inventoryBuffer?: number;
  enableInventoryCheck?: boolean;
  opened: boolean;
  onAddToCart: (variantSku: string, productName: string, quantity?: string) => void;
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
  const [selectedGender, setSelectedGender] = useState<string | undefined>();
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [selectedWidth, setSelectedWidth] = useState<string | undefined>();
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [selectedInsertQuantity, setSelectedInsertQuantity] = useState<string | undefined>(quantity || undefined);
  const tShared = useTranslations('shared.action');
  const t = useTranslations('components.orthofeet.productDetail');

  const { data: allProducts } = useOrthofeetProductStyleVariants({
    params: { style },
    enabled: opened && !!style
  });

  const parentProduct = useMemo(() => allProducts?.find((p) => !p.parentId), [allProducts]);
  const variants = useMemo(() => allProducts?.filter((p) => p.parentId) || [], [allProducts]);

  // Get all unique genders
  const genders = useMemo(() => getUniqueAttributeValues(variants, ORTHOFEET_ATTRIBUTES.GENDER), [variants]);
  const showGenderSelector = genders.length > 1;

  // Filter variants by gender if selected
  const filteredByGender = useMemo(
    () =>
      selectedGender
        ? filterProductsByAttributes(variants, { [ORTHOFEET_ATTRIBUTES.GENDER]: selectedGender })
        : variants,
    [variants, selectedGender]
  );

  const colors = useMemo(
    () => getUniqueAttributeValues(filteredByGender, ORTHOFEET_ATTRIBUTES.COLOR),
    [filteredByGender]
  );

  // Filter variants based on gender and color selection
  const filteredByColor = useMemo(
    () =>
      selectedColor
        ? filterProductsByAttributes(filteredByGender, { [ORTHOFEET_ATTRIBUTES.COLOR]: selectedColor })
        : filteredByGender,
    [filteredByGender, selectedColor]
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
        [ORTHOFEET_ATTRIBUTES.GENDER]: selectedGender,
        [ORTHOFEET_ATTRIBUTES.COLOR]: selectedColor,
        [ORTHOFEET_ATTRIBUTES.WIDTH]: selectedWidth,
        [ORTHOFEET_ATTRIBUTES.SIZE]: selectedSize
      })[0],
    [variants, selectedGender, selectedColor, selectedWidth, selectedSize]
  );

  const currentVariantSku = currentVariant?.sku || '';

  // Only check inventory when all selections are complete
  const isFullySelected = !!(
    (showGenderSelector ? selectedGender : true) &&
    selectedColor &&
    selectedWidth &&
    selectedSize
  );

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

  // Reset downstream selections when upstream filters change
  const resetFromGender = () => {
    setSelectedColor(undefined);
    setSelectedWidth(undefined);
    setSelectedSize(undefined);
  };

  const resetFromColor = () => {
    setSelectedWidth(undefined);
    setSelectedSize(undefined);
  };

  const resetFromWidth = () => {
    setSelectedSize(undefined);
  };

  const handleGenderChange = (value: string) => {
    setSelectedGender(value);
    resetFromGender();
  };

  const handleColorChange = (value: string) => {
    setSelectedColor(value);
    resetFromColor();
  };

  const handleWidthChange = (value: string) => {
    setSelectedWidth(value);
    resetFromWidth();
  };

  const addShoeToOrder = () => {
    const requiredFieldsSelected =
      (showGenderSelector ? selectedGender : true) && selectedColor && selectedWidth && selectedSize;

    if (!currentVariant || !requiredFieldsSelected) {
      modals.openConfirmModal({
        title: t('missingInfoTitle'),
        children: <Text size="sm">{t('missingInfoMessage')}</Text>,
        labels: {
          confirm: 'OK',
          cancel: tShared('cancel')
        }
      });
      return;
    }

    const variantSku = currentVariant.sku;

    if (!variantSku) {
      return;
    }

    const productName = currentVariant.name || parentProduct?.name || '';
    const insertQuantity = price ? selectedInsertQuantity : undefined;

    onAddToCart(variantSku, productName, insertQuantity);
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
                {t('outOfStock')}
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
                {t('addToOrder')}
              </Button>
            )}
          </Group>
          <Divider color="gray.3" />
        </Stack>
        <Drawer.Body p="0" pb={{ base: 'xl', sm: '0' }}>
          <Stack>
            {/* Price Display - Only show when variant is fully selected */}
            {currentVariantSku && selectedColor && selectedWidth && selectedSize && (
              <DrawerSection title={t('priceLabel')}>
                {selectedInsertQuantity && price ? (
                  <Stack gap="xs">
                    <Text size="sm" fw="500">
                      {t('shoePrice')}: {formatCurrency(productPrice)}
                    </Text>
                    <Text size="sm" fw="500">
                      {t('insertPrice')}: {formatCurrency((price / 100) * Number(selectedInsertQuantity))}
                    </Text>
                    <Text size="md" fw="600">
                      {t('totalPrice')}: {formatCurrency(productPrice + (price / 100) * Number(selectedInsertQuantity))}
                    </Text>
                  </Stack>
                ) : (
                  <Text size="md" fw="600">
                    {formatCurrency(productPrice)}
                  </Text>
                )}
              </DrawerSection>
            )}

            {/* Gender Selector - Only show if multiple genders available */}
            {showGenderSelector && (
              <DrawerSection title={t('gender')}>
                <Chip.Group multiple={false} value={selectedGender} onChange={handleGenderChange}>
                  <Group justify="flex-start" gap="sm">
                    {genders.map((gender) => (
                      <Chip key={gender} value={gender}>
                        {gender}
                      </Chip>
                    ))}
                  </Group>
                </Chip.Group>
              </DrawerSection>
            )}

            {/* Color Selector */}
            <DrawerSection title={t('color')}>
              {!showGenderSelector || selectedGender ? (
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
              ) : (
                <Text size="sm" c="dimmed">
                  {t('selectGender')}
                </Text>
              )}
            </DrawerSection>

            {/* Width Selector */}
            <DrawerSection title={t('width')}>
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
                  {t('selectColor')}
                </Text>
              )}
            </DrawerSection>

            {/* Size Selector */}
            <DrawerSection title={t('size')} hideDivider>
              {selectedWidth ? (
                <Chip.Group
                  key={`${selectedColor}-${selectedWidth}`}
                  multiple={false}
                  value={selectedSize}
                  onChange={(value) => value && setSelectedSize(value)}
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
                  {t('selectWidth')}
                </Text>
              )}
            </DrawerSection>

            {/* Insert Quantity Selector */}
            {!!price && (
              <DrawerSection title={t('prefabQuantity')}>
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
