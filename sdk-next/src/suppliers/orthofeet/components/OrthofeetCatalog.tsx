'use client';

import { formatCurrency, OrthofeetProductStyle } from '@hike/sdk';
import { useOrthofeetFilters, useOrthofeetProductStyles, useOrthofeetProductStyleVariants } from '@hike/ui';
import {
  Alert,
  Box,
  Button,
  Group,
  LoadingOverlay,
  Pagination,
  ScrollArea,
  Stack,
  Tabs,
  Text,
  TextInput
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconSearch, IconX } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ORTHOFEET_MAX_PRICE_FILTER } from '../config';
import { productBuilder } from '../utils/productBuilder';
import { OrthofeetProductDetail } from './OrthofeetProductDetail';
import { OrthofeetProductGrid } from './OrthofeetProductGrid';
import { OrthofeetSelectedProduct } from './OrthofeetSelectedProduct';

export interface OrthofeetCatalogProps {
  prefabInsertPrice?: number;
  prefabInsertQuantity?: string;
  inventoryBuffer?: number;
  enableInventoryCheck?: boolean;
  isLoading?: boolean;
  selectedSku?: string;
  onAddToCart: (variantSku: string, variantName: string, prefabInsertQuantity?: string) => void;
  onRemove?: () => void;
}

export const OrthofeetCatalog = ({
  prefabInsertPrice,
  prefabInsertQuantity,
  inventoryBuffer = 0,
  enableInventoryCheck = false,
  isLoading = false,
  selectedSku,
  onAddToCart,
  onRemove
}: OrthofeetCatalogProps) => {
  const [selectedGender, setSelectedGender] = useState<string | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [drawerStyle, setDrawerStyle] = useState<string | undefined>();
  const [drawerEditingSku, setDrawerEditingSku] = useState<string | undefined>();
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebouncedValue(searchTerm, 300);
  const [prevSearchTerm, setPrevSearchTerm] = useState(debouncedSearchTerm);
  const [page, setPage] = useState(0);
  const pageSize = 48; // Divisible by 1-4 for responsive grid
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const hasSelectedSku = !!selectedSku?.trim();
  const t = useTranslations('components.orthofeet.catalog');

  const { data: filters } = useOrthofeetFilters();

  // Fetch filtered products
  const {
    data: products,
    isLoading: productsLoading,
    isError: productsError
  } = useOrthofeetProductStyles({
    params: {
      term: debouncedSearchTerm || undefined,
      genderValue: selectedGender,
      categoryValue: selectedCategory,
      maxPrice,
      offset: page * pageSize,
      limit: pageSize
    },
    staleTime: Infinity
  });

  const totalPages = products ? Math.ceil(products.total / pageSize) : 0;

  // Fetch selected product variants to build product object
  const { data: selectedProductVariants } = useOrthofeetProductStyleVariants({
    params: { sku: selectedSku || '' },
    enabled: hasSelectedSku,
    staleTime: 5 * 60 * 1000
  });

  // Build selected product once
  const selectedProduct = useMemo(
    () => (selectedProductVariants && selectedSku ? productBuilder(selectedProductVariants, selectedSku) : null),
    [selectedProductVariants, selectedSku]
  );

  const handleAddToCart = (variantSku: string, productName: string, selectedPrefabQuantity?: string) => {
    onAddToCart(variantSku, productName, selectedPrefabQuantity);
    closeDrawer();
  };

  const openProductDrawer = (productStyle: OrthofeetProductStyle) => {
    setDrawerStyle(productStyle.value);
    setDrawerEditingSku(undefined);
    setTimeout(() => setDrawerOpened(true), 0);
  };

  const openEditDrawer = () => {
    setDrawerStyle(undefined);
    setDrawerEditingSku(selectedSku);
    setTimeout(() => setDrawerOpened(true), 0);
  };

  const closeDrawer = () => {
    setDrawerOpened(false);
    setTimeout(() => {
      setDrawerStyle(undefined);
      setDrawerEditingSku(undefined);
    }, 300);
  };

  const toggleFilter = <T,>(currentValue: T | undefined, newValue: T) => {
    setPage(0);
    return currentValue === newValue ? undefined : newValue;
  };

  // Reset page when search changes
  if (prevSearchTerm !== debouncedSearchTerm) {
    setPrevSearchTerm(debouncedSearchTerm);
    setPage(0);
  }

  // Scroll to top when page changes
  useEffect(() => {
    scrollContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [page]);

  if (productsError) {
    return (
      <Alert color="red" title="Error loading catalog">
        There was an error loading the catalog. Please try again later.
      </Alert>
    );
  }

  return (
    <Box pos="relative">
      <LoadingOverlay visible={isLoading} />

      <Stack gap="md">
        {/* Scroll anchor for pagination */}
        <div ref={scrollContainerRef} />

        {/* Show selected product if a valid SKU is provided */}
        {selectedProduct ? (
          <OrthofeetSelectedProduct
            product={selectedProduct}
            prefabInsertPrice={prefabInsertPrice}
            prefabInsertQuantity={prefabInsertQuantity}
            onEdit={openEditDrawer}
            onRemove={onRemove!}
          />
        ) : (
          <>
            {/* Search Input */}
            <TextInput
              placeholder={t('searchPlaceholder')}
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.currentTarget.value)}
              size="md"
              leftSection={<IconSearch size={18} />}
              rightSection={
                searchTerm && <IconX size="16" style={{ cursor: 'pointer' }} onClick={() => setSearchTerm('')} />
              }
            />

            {/* Filter Buttons */}
            <Group gap="xs" wrap="wrap">
              <Button
                size="compact-sm"
                variant={maxPrice ? 'filled' : 'light'}
                color="indigo"
                onClick={() => setMaxPrice((current) => toggleFilter(current, ORTHOFEET_MAX_PRICE_FILTER))}
              >
                {maxPrice
                  ? t('viewingUnder', { price: formatCurrency(ORTHOFEET_MAX_PRICE_FILTER, 'USD', true) })
                  : t('viewAllPrices')}
              </Button>
              {filters?.genders?.map((gender) => (
                <Button
                  key={gender.value}
                  size="compact-sm"
                  variant={selectedGender === gender.value ? 'filled' : 'light'}
                  onClick={() => setSelectedGender((current) => toggleFilter(current, gender.value))}
                >
                  {gender.description || gender.value}
                </Button>
              ))}
            </Group>

            {/* Category Tabs */}
            {!!filters?.categories?.length && (
              <ScrollArea type="auto">
                <Tabs
                  value={selectedCategory || 'all'}
                  onChange={(value) => {
                    setSelectedCategory(value === 'all' ? undefined : value || undefined);
                    setPage(0);
                  }}
                >
                  <Tabs.List style={{ flexWrap: 'nowrap' }}>
                    <Tabs.Tab value="all">{t('allCategories')}</Tabs.Tab>
                    {filters.categories.map((category) => (
                      <Tabs.Tab key={category.value} value={category.value}>
                        {category.description || category.value}
                      </Tabs.Tab>
                    ))}
                  </Tabs.List>
                </Tabs>
              </ScrollArea>
            )}

            {/* Product Grid */}
            <OrthofeetProductGrid
              products={products?.data || []}
              isLoading={productsLoading}
              onProductSelect={openProductDrawer}
            />

            {!productsLoading && (!products?.data || products.data.length === 0) && (
              <Text size="sm" ta="center" w="100%" c="gray.6" mt="xl">
                {t('noProducts')}
              </Text>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Group justify="center" mt="xl">
                <Pagination total={totalPages} value={page + 1} onChange={(newPage) => setPage(newPage - 1)} />
              </Group>
            )}
          </>
        )}
      </Stack>

      {/* Product Detail Drawer */}
      {(drawerStyle || drawerEditingSku) && (
        <OrthofeetProductDetail
          style={drawerStyle}
          editingSku={drawerEditingSku}
          prefabInsertPrice={prefabInsertPrice}
          prefabInsertQuantity={prefabInsertQuantity}
          inventoryBuffer={inventoryBuffer}
          enableInventoryCheck={enableInventoryCheck}
          opened={drawerOpened}
          onAddToCart={handleAddToCart}
          onClose={closeDrawer}
        />
      )}
    </Box>
  );
};
