'use client';

import { formatCurrency, OrthofeetProductStyle } from '@hike/sdk';
import { useOrthofeetFilters, useOrthofeetProductStyles, useOrthofeetProductStyleVariants } from '@hike/ui';
import { Alert, Box, Button, Group, LoadingOverlay, Stack } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useRef, useState } from 'react';
import { CatalogPagination } from '../../components/CatalogPagination';
import { CatalogSearchBar } from '../../components/CatalogSearchBar';
import { CategoryNavigation } from '../../components/CategoryNavigation';
import { ProductCardGrid } from '../../components/ProductCardGrid';
import { ORTHOFEET_MAX_PRICE_FILTER } from '../config';
import { productBuilder } from '../utils/productBuilder';
import { OrthofeetProductCard } from './OrthofeetProductCard';
import { OrthofeetProductDetail } from './OrthofeetProductDetail';
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
  const t = useTranslations('suppliers.orthofeet.catalog');
  const tSuppliers = useTranslations('suppliers');

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
      <Alert color="red" title={tSuppliers('errorLoadingCatalogTitle')}>
        {tSuppliers('errorLoadingCatalogMessage')}
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
            <CatalogSearchBar value={searchTerm} onChange={setSearchTerm} />

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
              <CategoryNavigation
                categories={filters.categories.map((cat) => ({
                  value: cat.value,
                  label: cat.description || cat.value
                }))}
                selectedCategory={selectedCategory}
                onCategoryChange={(value) => {
                  setSelectedCategory(value);
                  setPage(0);
                }}
                showAll
                allLabel={tSuppliers('allCategories')}
              />
            )}

            {/* Product Grid */}
            <ProductCardGrid
              products={products?.data || []}
              getKey={(product) => product.value}
              isLoading={productsLoading}
              onProductSelect={openProductDrawer}
              renderCard={(product, onSelect) => <OrthofeetProductCard productStyle={product} onSelect={onSelect} />}
            />

            {/* Pagination */}
            <CatalogPagination
              totalPages={totalPages}
              currentPage={page}
              onPageChange={setPage}
              scrollRef={scrollContainerRef}
            />
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
