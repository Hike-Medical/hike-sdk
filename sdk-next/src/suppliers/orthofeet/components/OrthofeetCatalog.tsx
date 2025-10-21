'use client';

import { CatalogProductExtended } from '@hike/sdk';
import { useOrthofeetStyleProducts } from '@hike/ui';
import { Alert, Box, Button, Group, LoadingOverlay, ScrollArea, Stack, Tabs, Text, TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useState } from 'react';
import { ORTHOFEET_ATTRIBUTES, getProductAttributeLabel, getProductAttributeValue } from '../utils/attributeHelpers';
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

  // Detail drawer state
  const [selectedStyleName, setSelectedStyleName] = useState<string | undefined>();
  const [selectedProduct, setSelectedProduct] = useState<CatalogProductExtended | undefined>();
  const [detailOpened, setDetailOpened] = useState(false);

  // Fetch all products to get unique categories and genders
  const { data: allProducts } = useOrthofeetStyleProducts({
    params: {
      supplierId,
      sortOrder: 'desc'
    },
    staleTime: Infinity
  });

  // Get unique categories from all products with their labels
  const categories = allProducts?.data
    ? Array.from(
        new Map(
          allProducts.data
            .map((p) => {
              const value = getProductAttributeValue(p, ORTHOFEET_ATTRIBUTES.CLASS);
              const label = getProductAttributeLabel(p, ORTHOFEET_ATTRIBUTES.CLASS);
              return value ? [value, label || value] : null;
            })
            .filter((entry): entry is [string, string] => entry !== null)
        ).entries()
      )
        .map(([value, label]) => ({ value, label }))
        .sort((a, b) => a.label.localeCompare(b.label))
    : [];

  // Get unique genders from all products with their labels
  // Need to check children too since gender attribute lives on variants
  const genders = allProducts?.data
    ? Array.from(
        new Map(
          allProducts.data
            .flatMap((p) => [p, ...((p.children || []) as CatalogProductExtended[])])
            .map((p) => {
              const value = getProductAttributeValue(p, ORTHOFEET_ATTRIBUTES.GENDER);
              const label = getProductAttributeLabel(p, ORTHOFEET_ATTRIBUTES.GENDER);
              return value ? [value, label || value] : null;
            })
            .filter((entry): entry is [string, string] => entry !== null)
        ).entries()
      )
        .map(([value, label]) => ({ value, label }))
        .sort((a, b) => a.label.localeCompare(b.label))
    : [];

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
      sortOrder: 'desc'
    },
    staleTime: Infinity
  });

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
  };

  const toggleMaxPrice = () => {
    setMaxPrice((current) => (current ? undefined : 60));
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
              {gender.label}
            </Button>
          ))}
        </Group>

        {/* Category Tabs */}
        {categories.length > 0 && (
          <ScrollArea type="auto">
            <Tabs
              value={selectedCategory || 'all'}
              onChange={(value) => setSelectedCategory(value === 'all' ? undefined : value || undefined)}
            >
              <Tabs.List style={{ flexWrap: 'nowrap' }}>
                <Tabs.Tab value="all">All Categories</Tabs.Tab>
                {categories.map((category) => (
                  <Tabs.Tab key={category.value} value={category.value}>
                    {category.label}
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
