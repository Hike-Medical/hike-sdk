'use client';

import { CatalogProductExtended } from '@hike/sdk';
import { useOrthofeetFilters, useOrthofeetStyleProducts } from '@hike/ui';
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
import { useState } from 'react';
import { OrthofeetProductDetail } from './OrthofeetProductDetail';
import { OrthofeetProductGrid } from './OrthofeetProductGrid';

export interface OrthofeetCatalogProps {
  supplierId: string;
  orthofeetSupplierId?: string;
  orthofeetInventoryBuffer?: number;
  onAddToCart: (variantSku: string, variantName: string, prefabQuantity?: string) => void;
  prefabPrice?: number;
  multiplier?: number;
  formSubmissionPrefabQuantity?: string;
  isLoading?: boolean;
}

export function OrthofeetCatalog({
  supplierId,
  orthofeetSupplierId,
  orthofeetInventoryBuffer,
  onAddToCart,
  prefabPrice,
  multiplier = 0,
  formSubmissionPrefabQuantity,
  isLoading = false
}: OrthofeetCatalogProps) {
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebouncedValue(searchTerm, 300);
  const [selectedGender, setSelectedGender] = useState<string | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();

  // Pagination
  const [page, setPage] = useState(0);
  const pageSize = 50;

  // Reset page when search term changes
  const [prevSearchTerm, setPrevSearchTerm] = useState(debouncedSearchTerm);
  if (prevSearchTerm !== debouncedSearchTerm) {
    setPrevSearchTerm(debouncedSearchTerm);
    setPage(0);
  }

  // Detail drawer state
  const [selectedStyleName, setSelectedStyleName] = useState<string | undefined>();
  const [selectedProduct, setSelectedProduct] = useState<CatalogProductExtended | undefined>();
  const [detailOpened, setDetailOpened] = useState(false);

  // Fetch filter options efficiently (categories and genders)
  const { data: filters } = useOrthofeetFilters({
    params: { supplierId }
  });

  const categories = filters?.categories || [];
  const genders = filters?.genders || [];

  // Fetch filtered products
  const {
    data: products,
    isLoading: productsLoading,
    isError: productsError
  } = useOrthofeetStyleProducts({
    params: {
      supplierId,
      genderAttributeValue: selectedGender,
      categoryAttributeValue: selectedCategory,
      term: debouncedSearchTerm || undefined,
      maxPrice,
      sortOrder: 'desc',
      offset: page * pageSize,
      limit: pageSize
    },
    staleTime: Infinity
  });

  const totalPages = products ? Math.ceil(products.total / pageSize) : 0;

  const handleProductSelect = (styleNameValue: string, product: CatalogProductExtended) => {
    setSelectedStyleName(styleNameValue);
    setSelectedProduct(product);
    setDetailOpened(true);
  };

  const handleAddToCart = (variantSku: string, prefabQuantity?: string) => {
    onAddToCart(variantSku, selectedProduct?.name || '', prefabQuantity);
    setDetailOpened(false);
  };

  const toggleGenderFilter = (genderValue: string) => {
    setSelectedGender((current) => (current === genderValue ? undefined : genderValue));
    setPage(0); // Reset to first page when filter changes
  };

  const toggleMaxPrice = () => {
    setMaxPrice((current) => (current ? undefined : 60));
    setPage(0); // Reset to first page when filter changes
  };

  const handleCategoryChange = (value: string | null) => {
    setSelectedCategory(value === 'all' ? undefined : value || undefined);
    setPage(0); // Reset to first page when category changes
  };

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
          {genders.map((gender) => (
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
        {categories.length > 0 && (
          <ScrollArea type="auto">
            <Tabs value={selectedCategory || 'all'} onChange={handleCategoryChange}>
              <Tabs.List style={{ flexWrap: 'nowrap' }}>
                <Tabs.Tab value="all">All Categories</Tabs.Tab>
                {categories.map((category) => (
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
      {selectedStyleName && (
        <OrthofeetProductDetail
          styleNameValue={selectedStyleName}
          supplierId={supplierId}
          orthofeetSupplierId={orthofeetSupplierId}
          orthofeetInventoryBuffer={orthofeetInventoryBuffer}
          opened={detailOpened}
          onClose={() => setDetailOpened(false)}
          onAddToCart={handleAddToCart}
          prefabPrice={prefabPrice}
          formSubmissionPrefabQuantity={formSubmissionPrefabQuantity}
          multiplier={multiplier}
          parentProduct={selectedProduct}
        />
      )}
    </Box>
  );
}
