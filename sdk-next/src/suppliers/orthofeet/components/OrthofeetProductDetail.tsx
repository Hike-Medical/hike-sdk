'use client';

import { formatCurrency } from '@hike/sdk';
import { useOrthofeetInventoryBySku, useOrthofeetProductStyleVariants } from '@hike/ui';
import {
  Badge,
  Box,
  Button,
  Chip,
  ColorSwatch,
  Divider,
  Drawer,
  Group,
  Image,
  Stack,
  Table,
  Text,
  Title,
  rem
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { useTranslations } from 'next-intl';
import { ReactNode, useMemo, useState } from 'react';
import {
  ORTHOFEET_ATTRIBUTES,
  filterProductsByAttributes,
  getProductAttributeDisplay,
  getUniqueAttributeOptions
} from '../utils/attributeHelpers';
import { getOrthofeetColorHex } from '../utils/colorMap';

interface OrthofeetProductDetailProps {
  style?: string;
  editingSku?: string;
  prefabInsertPrice?: number;
  prefabInsertQuantity?: string;
  inventoryBuffer?: number;
  enableInventoryCheck?: boolean;
  opened: boolean;
  onAddToCart: (variantSku: string, productName: string, prefabInsertQuantity?: string) => void;
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
  editingSku,
  prefabInsertPrice,
  prefabInsertQuantity,
  inventoryBuffer = 0,
  enableInventoryCheck = false,
  opened,
  onClose,
  onAddToCart
}: OrthofeetProductDetailProps) => {
  const tShared = useTranslations('shared');
  const t = useTranslations('components.orthofeet.productDetail');

  // Fetch by style or by SKU
  const { data: allProducts } = useOrthofeetProductStyleVariants({
    params: style ? { style } : editingSku ? { sku: editingSku } : {},
    enabled: opened && (!!style || !!editingSku)
  });

  const parentProduct = useMemo(() => allProducts?.find((p) => !p.parentId), [allProducts]);
  const variants = useMemo(() => allProducts?.filter((p) => p.parentId) || [], [allProducts]);

  // Find editing variant to pre-populate selections
  const editingVariant = useMemo(
    () => (editingSku ? variants.find((v) => v.sku === editingSku) : undefined),
    [editingSku, variants]
  );

  // Get attributes helper
  const getAttribute = (product: typeof editingVariant, key: string) =>
    product?.attributes?.find((a) => a.key === key)?.value;

  const [selectedGender, setSelectedGender] = useState<string | undefined>(
    editingVariant ? getAttribute(editingVariant, ORTHOFEET_ATTRIBUTES.GENDER) : undefined
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    editingVariant ? getAttribute(editingVariant, ORTHOFEET_ATTRIBUTES.COLOR) : undefined
  );
  const [selectedWidth, setSelectedWidth] = useState<string | undefined>(
    editingVariant ? getAttribute(editingVariant, ORTHOFEET_ATTRIBUTES.WIDTH) : undefined
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    editingVariant ? getAttribute(editingVariant, ORTHOFEET_ATTRIBUTES.SIZE) : undefined
  );
  const [selectedPrefabInsertQuantity, setSelectedPrefabInsertQuantity] = useState<string | undefined>(
    prefabInsertQuantity || undefined
  );

  // Get all unique genders with display labels
  const genderOptions = useMemo(() => getUniqueAttributeOptions(variants, ORTHOFEET_ATTRIBUTES.GENDER), [variants]);
  const showGenderSelector = genderOptions.length > 1;

  // Filter variants by gender if selected
  const filteredByGender = useMemo(
    () =>
      selectedGender
        ? filterProductsByAttributes(variants, { [ORTHOFEET_ATTRIBUTES.GENDER]: selectedGender })
        : variants,
    [variants, selectedGender]
  );

  const colorOptions = useMemo(
    () => getUniqueAttributeOptions(filteredByGender, ORTHOFEET_ATTRIBUTES.COLOR),
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
  const widthOptions = useMemo(
    () => getUniqueAttributeOptions(filteredByColor, ORTHOFEET_ATTRIBUTES.WIDTH),
    [filteredByColor]
  );

  // Get available sizes from color+width-filtered variants
  const sizeOptions = useMemo(
    () => getUniqueAttributeOptions(filteredByColorWidth, ORTHOFEET_ATTRIBUTES.SIZE),
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
          cancel: tShared('action.cancel')
        }
      });
      return;
    }

    const variantSku = currentVariant.sku;

    if (!variantSku) {
      return;
    }

    const productName = currentVariant.name || parentProduct?.name || '';
    const prefabQuantity = prefabInsertPrice ? selectedPrefabInsertQuantity : undefined;

    onAddToCart(variantSku, productName, prefabQuantity);
    onClose();
  };

  const currentImage = currentVariant?.image || parentProduct?.image;
  const productPrice = parentProduct?.price ?? currentVariant?.price ?? 0;
  const showOutOfStock = enableInventoryCheck && isFullySelected && !inventoryLoading && !inventoryError && !isInStock;
  const isButtonDisabled =
    !isFullySelected || (enableInventoryCheck && isFullySelected && !inventoryLoading && !isInStock);

  return (
    <Drawer.Root position="bottom" size="90dvh" opened={opened} onClose={onClose}>
      <Drawer.Overlay />
      <Drawer.Content>
        <Stack px={{ base: 'sm', sm: 'lg' }} py={{ base: 'sm', sm: 'lg' }} gap="sm">
          <Group justify="space-between" wrap="nowrap" gap="md">
            <Drawer.CloseButton size="lg" />
            <Drawer.Title
              ta="center"
              fw="600"
              c="gray.8"
              lh={1.4}
              style={{
                flex: 1,
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
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
            {/* Price Display - Always show */}
            <DrawerSection title={tShared('label.price')}>
              {currentVariantSku && selectedColor && selectedWidth && selectedSize ? (
                <Stack gap="md">
                  {/* Product Image */}
                  {currentImage && (
                    <Box style={{ flexShrink: 0 }}>
                      <Image
                        src={currentImage}
                        alt={parentProduct?.name || currentVariant?.name || ''}
                        w={60}
                        h="auto"
                        fit="contain"
                        radius="sm"
                      />
                    </Box>
                  )}

                  {/* Price Info */}
                  <Stack gap={4} style={{ flex: 1 }}>
                    {selectedPrefabInsertQuantity && prefabInsertPrice ? (
                      <>
                        <Group justify="space-between" wrap="nowrap">
                          <Text size="sm" c="dimmed">
                            {t('shoePrice')}
                          </Text>
                          <Text size="sm" fw="500">
                            {formatCurrency(productPrice)}
                          </Text>
                        </Group>
                        <Group justify="space-between" wrap="nowrap">
                          <Text size="sm" c="dimmed">
                            {t('insertPrice')}
                          </Text>
                          <Text size="sm" fw="500">
                            {formatCurrency((prefabInsertPrice / 100) * Number(selectedPrefabInsertQuantity))}
                          </Text>
                        </Group>
                        <Group justify="space-between" wrap="nowrap">
                          <Text size="md" fw="600">
                            {t('totalPrice')}
                          </Text>
                          <Text size="md" fw="600">
                            {formatCurrency(
                              productPrice + (prefabInsertPrice / 100) * Number(selectedPrefabInsertQuantity)
                            )}
                          </Text>
                        </Group>
                      </>
                    ) : (
                      <Text size="md" fw="600">
                        {formatCurrency(productPrice)}
                      </Text>
                    )}
                  </Stack>
                </Stack>
              ) : (
                <Text size="sm" c="dimmed">
                  {t('selectAllOptions') || 'Select all options to view price'}
                </Text>
              )}
            </DrawerSection>

            {/* Gender Selector - Only show if multiple genders available */}
            {showGenderSelector && (
              <DrawerSection title={tShared('label.gender')}>
                <Chip.Group multiple={false} value={selectedGender} onChange={handleGenderChange}>
                  <Group justify="flex-start" gap="sm">
                    {genderOptions.map((option) => (
                      <Chip key={option.value} value={option.value}>
                        {option.label}
                      </Chip>
                    ))}
                  </Group>
                </Chip.Group>
              </DrawerSection>
            )}

            {/* Color Selector */}
            <DrawerSection title={tShared('label.color')}>
              {!showGenderSelector || selectedGender ? (
                <Chip.Group multiple={false} value={selectedColor} onChange={handleColorChange}>
                  <Group justify="flex-start" gap="sm">
                    {colorOptions.map((option) => {
                      const colorHex = getOrthofeetColorHex(option.label);
                      const swatchColor = colorHex || 'gray';

                      return (
                        <Chip key={option.value} value={option.value}>
                          <Group gap="xs">
                            <ColorSwatch size={rem(15)} color={swatchColor} />
                            {option.label}
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
            <DrawerSection title={tShared('label.width')}>
              {selectedColor ? (
                <Chip.Group key={selectedColor} multiple={false} value={selectedWidth} onChange={handleWidthChange}>
                  <Group justify="flex-start" gap="sm">
                    {widthOptions.map((option) => (
                      <Chip key={option.value} value={option.value}>
                        {option.label}
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
            <DrawerSection title={t('shoeSizes')}>
              {selectedWidth ? (
                <Chip.Group
                  key={`${selectedColor}-${selectedWidth}`}
                  multiple={false}
                  value={selectedSize}
                  onChange={(value) => value && setSelectedSize(value)}
                >
                  <Group justify="flex-start" gap="sm">
                    {sizeOptions
                      .sort((a, b) => parseFloat(a.value) - parseFloat(b.value))
                      .map((option) => (
                        <Chip key={option.value} value={option.value}>
                          {option.label}
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

            {/* Prefab Insert Quantity Selector */}
            {!!prefabInsertPrice && (
              <DrawerSection title={t('prefabQuantity')}>
                <Chip.Group
                  multiple={false}
                  value={selectedPrefabInsertQuantity?.toString() ?? ''}
                  onChange={(value) => {
                    setSelectedPrefabInsertQuantity(value === selectedPrefabInsertQuantity ? undefined : value);
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

            {/* Product Attributes Table - Show when variant is selected */}
            {currentVariant && (
              <DrawerSection title="Attributes" hideDivider>
                <Table striped withRowBorders={false} horizontalSpacing="xs" verticalSpacing="xs">
                  <Table.Tbody>
                    {[
                      { key: ORTHOFEET_ATTRIBUTES.CLASS, label: 'Class' },
                      { key: ORTHOFEET_ATTRIBUTES.STYLE_NAME, label: 'Style' },
                      { key: ORTHOFEET_ATTRIBUTES.GENDER, label: 'Gender' },
                      { key: ORTHOFEET_ATTRIBUTES.MATERIAL, label: 'Material' },
                      { key: ORTHOFEET_ATTRIBUTES.CLOSURE, label: 'Closure' }
                    ].map(({ key, label }) => {
                      // Get value from variant first, fallback to parent
                      const value =
                        getProductAttributeDisplay(currentVariant, key) ||
                        (parentProduct && getProductAttributeDisplay(parentProduct, key));
                      return value ? (
                        <Table.Tr key={key}>
                          <Table.Td w="35%" c="dimmed" fz="xs" fw={500}>
                            {label}
                          </Table.Td>
                          <Table.Td fz="xs">{value}</Table.Td>
                        </Table.Tr>
                      ) : null;
                    })}
                    {/* Features - can have multiple values */}
                    {(() => {
                      const variantFeatures = currentVariant.attributes?.filter(
                        (attr) => attr.key === ORTHOFEET_ATTRIBUTES.FEATURE && attr.value
                      );
                      const parentFeatures = parentProduct?.attributes?.filter(
                        (attr) => attr.key === ORTHOFEET_ATTRIBUTES.FEATURE && attr.value
                      );
                      // Combine and deduplicate by value
                      const allFeatures = [...(variantFeatures || []), ...(parentFeatures || [])];
                      const uniqueFeatures = Array.from(new Map(allFeatures.map((f) => [f.value, f])).values());

                      return uniqueFeatures.length > 0 ? (
                        <Table.Tr>
                          <Table.Td w="35%" c="dimmed" fz="xs" fw={500} style={{ verticalAlign: 'top' }}>
                            Features
                          </Table.Td>
                          <Table.Td fz="xs">
                            <Group gap="xs" wrap="wrap">
                              {uniqueFeatures.map((attr) => {
                                const display = attr.description?.trim() || attr.value;
                                return (
                                  <Badge key={`feature-${attr.value}`} size="xs" variant="light" color="blue">
                                    {display}
                                  </Badge>
                                );
                              })}
                            </Group>
                          </Table.Td>
                        </Table.Tr>
                      ) : null;
                    })()}
                  </Table.Tbody>
                </Table>
              </DrawerSection>
            )}
          </Stack>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
};
