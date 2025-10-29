'use client';

import { useCatalogCategories, useCatalogProducts, useProductBySku } from '@hike/ui';
import { Alert, Box, LoadingOverlay, Stack } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useTranslations } from 'next-intl';
import { useMemo, useRef, useState } from 'react';
import { CatalogPagination } from '../../components/CatalogPagination';
import { CatalogSearchBar } from '../../components/CatalogSearchBar';
import { CategoryNavigation } from '../../components/CategoryNavigation';
import { ProductCardGrid } from '../../components/ProductCardGrid';
import { GenericProductCard } from './GenericProductCard';
import { GenericProductDetail } from './GenericProductDetail';
import { GenericSelectedProduct } from './GenericSelectedProduct';

export interface GenericCatalogProps {
  supplierId: string;
  selectedSku?: string;
  onAddToCart: (variantSku: string, variantName: string) => void;
  onRemove?: () => void;
}

export const GenericCatalog = ({ supplierId, selectedSku, onAddToCart, onRemove }: GenericCatalogProps) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebouncedValue(searchTerm, 300);
  const [prevSearchTerm, setPrevSearchTerm] = useState(debouncedSearchTerm);
  const [page, setPage] = useState(0);
  const [drawerProductId, setDrawerProductId] = useState<string | undefined>();
  const [drawerEditingProductId, setDrawerEditingProductId] = useState<string | undefined>();
  const [drawerOpened, setDrawerOpened] = useState(false);
  const t = useTranslations('suppliers');
  const pageSize = 24;
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { data: categoriesResponse } = useCatalogCategories({
    params: {
      supplierId,
      limit: 100
    }
  });

  const categories = useMemo(
    () =>
      categoriesResponse?.data.map((cat) => ({
        value: cat.id,
        label: cat.name
      })) ?? [],
    [categoriesResponse]
  );

  // Fetch parent products only with variant counts
  const {
    data: productsResponse,
    isLoading: productsLoading,
    isError: productsError
  } = useCatalogProducts({
    params: {
      term: debouncedSearchTerm || undefined,
      filter: {
        supplierId,
        categoryId: selectedCategoryId,
        active: 'true'
      },
      sortBy: 'name',
      sortOrder: 'asc',
      limit: pageSize,
      offset: page * pageSize
    },
    staleTime: 5 * 60 * 1000
  });

  const products = useMemo(() => productsResponse?.data ?? [], [productsResponse?.data]);
  const totalPages = productsResponse ? Math.ceil(productsResponse.total / pageSize) : 0;

  const { data: selectedProduct } = useProductBySku({
    sku: selectedSku || '',
    enabled: !!selectedSku,
    staleTime: 5 * 60 * 1000
  });

  // Reset page when search or category changes
  if (prevSearchTerm !== debouncedSearchTerm) {
    setPrevSearchTerm(debouncedSearchTerm);
    setPage(0);
  }

  const openProductDrawer = (productId: string) => {
    setDrawerProductId(productId);
    setDrawerEditingProductId(undefined);
    setTimeout(() => setDrawerOpened(true), 0);
  };

  const openEditDrawer = () => {
    if (!selectedProduct) return;
    setDrawerProductId(undefined);
    setDrawerEditingProductId(selectedProduct.id);
    setTimeout(() => setDrawerOpened(true), 0);
  };

  const closeDrawer = () => {
    setDrawerOpened(false);
    setTimeout(() => {
      setDrawerProductId(undefined);
      setDrawerEditingProductId(undefined);
    }, 300);
  };

  if (productsError) {
    return (
      <Alert color="red" title={t('errorLoadingCatalogTitle')}>
        {t('errorLoadingCatalogMessage')}
      </Alert>
    );
  }

  return (
    <Box pos="relative">
      <LoadingOverlay visible={productsLoading && !products.length} />

      <Stack gap="md">
        <div ref={scrollContainerRef} />

        {/* Show selected product or catalog */}
        {selectedProduct ? (
          <GenericSelectedProduct product={selectedProduct} onEdit={openEditDrawer} onRemove={onRemove!} />
        ) : (
          <>
            {/* Search Bar */}
            <CatalogSearchBar value={searchTerm} onChange={setSearchTerm} />

            {/* Category Navigation */}
            {categories.length > 0 && (
              <CategoryNavigation
                categories={categories}
                selectedCategory={selectedCategoryId}
                onCategoryChange={(categoryId) => {
                  setSelectedCategoryId(categoryId);
                  setPage(0);
                }}
                showAll
                allLabel={t('allCategories')}
              />
            )}

            {/* Product Grid */}
            <ProductCardGrid
              products={products}
              getKey={(product) => product.id}
              isLoading={productsLoading}
              onProductSelect={(product) => openProductDrawer(product.id)}
              renderCard={(product: any, onSelect: () => void) => (
                <GenericProductCard product={product} onSelect={onSelect} />
              )}
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
      {(drawerProductId || drawerEditingProductId) && (
        <GenericProductDetail
          productId={drawerProductId}
          editingProductId={drawerEditingProductId}
          opened={drawerOpened}
          onAddToCart={onAddToCart}
          onClose={closeDrawer}
        />
      )}
    </Box>
  );
};
