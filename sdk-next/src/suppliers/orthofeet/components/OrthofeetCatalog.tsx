'use client';

import { OrthofeetProductStyle } from '@hike/sdk';
import { useOrthofeetFilters, useOrthofeetProductStyles } from '@hike/ui';
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
import { useEffect, useRef, useState } from 'react';
import { OrthofeetProductDetail } from './OrthofeetProductDetail';
import { OrthofeetProductGrid } from './OrthofeetProductGrid';

export interface OrthofeetCatalogProps {
  supplierId: string;
  multiplier?: number;
  prefabPrice?: number;
  formSubmissionPrefabQuantity?: string;
  inventoryBuffer?: number;
  enableInventoryCheck?: boolean;
  isLoading?: boolean;
  onAddToCart: (variantSku: string, variantName: string, prefabQuantity?: string) => void;
}

export const OrthofeetCatalog = ({
  supplierId,
  multiplier = 0,
  prefabPrice,
  formSubmissionPrefabQuantity,
  inventoryBuffer = 0,
  enableInventoryCheck = false,
  isLoading = false,
  onAddToCart
}: OrthofeetCatalogProps) => {
  const [selectedGender, setSelectedGender] = useState<string | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedProductStyle, setSelectedProductStyle] = useState<string | undefined>();
  const [selectedProduct, setSelectedProduct] = useState<OrthofeetProductStyle | undefined>();
  const [detailOpened, setDetailOpened] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebouncedValue(searchTerm, 300);
  const [prevSearchTerm, setPrevSearchTerm] = useState(debouncedSearchTerm);
  const [page, setPage] = useState(0);
  const pageSize = 48; // Always fills grid since divisible by 1-4
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { data: filters } = useOrthofeetFilters({
    params: { supplierId }
  });

  // Fetch filtered products
  const {
    data: products,
    isLoading: productsLoading,
    isError: productsError
  } = useOrthofeetProductStyles({
    params: {
      supplierId,
      genderValue: selectedGender,
      categoryValue: selectedCategory,
      term: debouncedSearchTerm || undefined,
      maxPrice,
      sortOrder: 'desc',
      offset: page * pageSize,
      limit: pageSize
    },
    staleTime: Infinity
  });

  const totalPages = products ? Math.ceil(products.total / pageSize) : 0;

  const handleProductSelect = (productStyle: OrthofeetProductStyle) => {
    setSelectedProductStyle(productStyle.value);
    setSelectedProduct(productStyle);
    setDetailOpened(true);
  };

  const handleAddToCart = (variantSku: string, prefabQuantity?: string) => {
    onAddToCart(variantSku, selectedProduct?.name || '', prefabQuantity);
    setDetailOpened(false);
  };

  const toggleGenderFilter = (genderValue: string) => {
    setSelectedGender((current) => (current === genderValue ? undefined : genderValue));
    setPage(0);
  };

  const toggleMaxPrice = () => {
    setMaxPrice((current) => (current ? undefined : 60));
    setPage(0);
  };

  const handleCategoryChange = (value: string | null) => {
    setSelectedCategory(value === 'all' ? undefined : value || undefined);
    setPage(0);
  };

  // Reset page when search term changes
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

        {/* Search Input */}
        <TextInput
          placeholder="Search for a product"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.currentTarget.value)}
          size="md"
        />

        {/* Filter Buttons */}
        <Group gap="xs" wrap="wrap">
          <Button size="compact-sm" variant={maxPrice ? 'filled' : 'light'} color="indigo" onClick={toggleMaxPrice}>
            {maxPrice ? 'Viewing Shoes Under $60' : 'View All Prices'}
          </Button>
          {filters?.genders?.map((gender) => (
            <Button
              key={gender.value}
              size="compact-sm"
              variant={selectedGender === gender.value ? 'filled' : 'light'}
              onClick={() => toggleGenderFilter(gender.value)}
            >
              {gender.description || gender.value}
            </Button>
          ))}
        </Group>

        {/* Category Tabs */}
        {!!filters?.categories?.length && (
          <ScrollArea type="auto">
            <Tabs value={selectedCategory || 'all'} onChange={handleCategoryChange}>
              <Tabs.List style={{ flexWrap: 'nowrap' }}>
                <Tabs.Tab value="all">All Categories</Tabs.Tab>
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
          multiplier={multiplier}
          onProductSelect={handleProductSelect}
        />

        {!productsLoading && (!products?.data || products.data.length === 0) && (
          <Text size="sm" ta="center" w="100%" c="gray.6" mt="xl">
            No products found
          </Text>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Group justify="center" mt="xl">
            <Pagination total={totalPages} value={page + 1} onChange={(newPage) => setPage(newPage - 1)} />
          </Group>
        )}
      </Stack>

      {/* Product Detail Drawer */}
      {selectedProductStyle && (
        <OrthofeetProductDetail
          style={selectedProductStyle}
          supplierId={supplierId}
          inventoryBuffer={inventoryBuffer}
          enableInventoryCheck={enableInventoryCheck}
          prefabPrice={prefabPrice}
          formSubmissionPrefabQuantity={formSubmissionPrefabQuantity}
          multiplier={multiplier}
          opened={detailOpened}
          onAddToCart={handleAddToCart}
          onClose={() => setDetailOpened(false)}
        />
      )}
    </Box>
  );
};
