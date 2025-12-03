'use client';

import { formatCurrency } from '@hike/sdk';
import { useCatalogProducts } from '@hike/ui';
import {
  Badge,
  Box,
  Card,
  Group,
  Image,
  Paper,
  Radio,
  ScrollArea,
  Stack,
  Text,
  Title,
  rem,
  useMantineTheme
} from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { ProductDetailDrawer } from '../../components/ProductDetailDrawer';

export interface GenericProductDetailProps {
  productId?: string;
  editingProductId?: string;
  opened: boolean;
  onClose: () => void;
  onAddToCart: (variantSku: string, variantName: string) => void;
}

const DrawerSection = ({
  title,
  children,
  noPadding = false
}: {
  title?: string;
  children: React.ReactNode;
  noPadding?: boolean;
}) => (
  <Stack gap="md" px={noPadding ? 0 : { base: 'md', sm: 'xl' }}>
    {title && (
      <Title order={4} size="h5" fw={600} c="gray.8">
        {title}
      </Title>
    )}
    {children}
  </Stack>
);

export const GenericProductDetail = ({
  productId,
  editingProductId,
  opened,
  onClose,
  onAddToCart
}: GenericProductDetailProps) => {
  const theme = useMantineTheme();
  const t = useTranslations('suppliers.generic.productDetail');

  const { data: productsResponse } = useCatalogProducts({
    params: {
      filter: { id: productId || '' },
      parentsOnly: false,
      includeChildren: true
    },
    enabled: opened && !!productId
  });

  const parentProduct = useMemo(() => productsResponse?.data?.[0], [productsResponse]);
  const variants = useMemo(() => parentProduct?.children || [], [parentProduct]);

  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>(
    editingProductId ? variants.find((v) => v.id === editingProductId)?.id : undefined
  );

  const selectedVariant = useMemo(
    () => variants.find((v) => v.id === selectedVariantId),
    [variants, selectedVariantId]
  );

  const currentImage = selectedVariant?.image || parentProduct?.image;
  const productPrice = selectedVariant?.price || parentProduct?.price || 0;

  const handleAddToOrder = () => {
    if (!selectedVariant) return;

    const sku = selectedVariant.sku || '';
    const name = selectedVariant.name || parentProduct?.name || '';

    onAddToCart(sku, name);
    onClose();
  };

  const isAddDisabled = !selectedVariant;

  return (
    <ProductDetailDrawer
      title={parentProduct?.name || 'Product Details'}
      opened={opened}
      onClose={onClose}
      onAddToCart={handleAddToOrder}
      isAddDisabled={isAddDisabled}
      addButtonText={editingProductId ? t('updateProduct') : t('addToOrder')}
    >
      <Stack gap="xl" pb="xl">
        {/* Selected Variant Summary - Show at top for visibility */}
        {selectedVariant && (
          <DrawerSection noPadding>
            <Box px={{ base: 'md', sm: 'xl' }}>
              <Card padding="lg" radius="md" withBorder bg="green.0" style={{ borderColor: theme.colors.green[3] }}>
                <Stack gap="sm">
                  <Group gap="xs">
                    <IconCheck size={20} color={theme.colors.green[7]} />
                    <Text size="sm" fw={600} c="green.8">
                      {t('variantSelected')}
                    </Text>
                  </Group>
                  <Group justify="space-between" align="flex-start">
                    <Stack gap={4}>
                      <Text size="sm" fw={500}>
                        {selectedVariant.name}
                      </Text>
                      {selectedVariant.sku && (
                        <Text size="xs" c="dimmed">
                          SKU: {selectedVariant.sku}
                        </Text>
                      )}
                    </Stack>
                    <Text size="lg" fw={700} c="green.8">
                      {formatCurrency(productPrice)}
                    </Text>
                  </Group>
                </Stack>
              </Card>
            </Box>
          </DrawerSection>
        )}

        {/* Product Image */}
        {currentImage && (
          <DrawerSection noPadding>
            <Box
              px={{ base: 'md', sm: 'xl' }}
              style={{
                position: 'relative',
                width: '100%'
              }}
            >
              <Paper
                radius="lg"
                p="xl"
                style={{
                  backgroundColor: theme.colors.gray[0],
                  border: `1px solid ${theme.colors.gray[2]}`
                }}
              >
                <Box
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: rem(280),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Image
                    src={currentImage}
                    alt={parentProduct?.name || ''}
                    fit="contain"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                  />
                </Box>
              </Paper>
            </Box>
          </DrawerSection>
        )}

        {/* Variant Selector */}
        {variants.length > 0 && (
          <DrawerSection title={t('selectVariant')}>
            <ScrollArea.Autosize mah={rem(400)} type="auto">
              <Radio.Group value={selectedVariantId} onChange={setSelectedVariantId}>
                <Stack gap="xs">
                  {variants.map((variant) => {
                    const isSelected = selectedVariantId === variant.id;
                    const variantPrice = variant.price || parentProduct?.price || 0;
                    const attributes = ((variant as any).attributes || [])
                      .filter((attr: any) => attr.type === 'TEXT' && attr.value)
                      .map((attr: any) => ({ key: attr.key, value: attr.value }));

                    return (
                      <Radio.Card
                        key={variant.id}
                        value={variant.id}
                        radius="md"
                        p="md"
                        style={{
                          cursor: 'pointer',
                          border: isSelected
                            ? `2px solid ${theme.colors.blue[6]}`
                            : `1px solid ${theme.colors.gray[3]}`,
                          backgroundColor: isSelected ? theme.colors.blue[0] : 'white',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <Group wrap="nowrap" justify="space-between" align="flex-start">
                          <Radio.Indicator />
                          <Stack gap="xs" flex={1} ml="xs">
                            <Group justify="space-between" wrap="nowrap">
                              <Text fw={isSelected ? 600 : 500} size="sm">
                                {variant.name || 'Unnamed Variant'}
                              </Text>
                              <Text fw={600} size="sm" c={isSelected ? 'blue.7' : 'gray.7'}>
                                {formatCurrency(variantPrice)}
                              </Text>
                            </Group>
                            {attributes.length > 0 && (
                              <Group gap={6}>
                                {attributes.map((attr) => (
                                  <Badge
                                    key={`${attr.key}-${attr.value}`}
                                    size="sm"
                                    variant={isSelected ? 'light' : 'outline'}
                                    color={isSelected ? 'blue' : 'gray'}
                                    styles={{
                                      root: {
                                        textTransform: 'none',
                                        fontWeight: 500
                                      }
                                    }}
                                  >
                                    {attr.value}
                                  </Badge>
                                ))}
                              </Group>
                            )}
                          </Stack>
                          {isSelected && <IconCheck size={18} color={theme.colors.blue[6]} />}
                        </Group>
                      </Radio.Card>
                    );
                  })}
                </Stack>
              </Radio.Group>
            </ScrollArea.Autosize>
            {!selectedVariantId && (
              <Text size="sm" c="dimmed" mt="md" ta="center">
                {t('selectVariantHint')}
              </Text>
            )}
          </DrawerSection>
        )}

        {/* No Variants Message */}
        {variants.length === 0 && (
          <DrawerSection>
            <Paper p="lg" radius="md" bg="gray.0">
              <Text size="sm" c="dimmed" ta="center">
                {t('noVariantsAvailable')}
              </Text>
            </Paper>
          </DrawerSection>
        )}
      </Stack>
    </ProductDetailDrawer>
  );
};
