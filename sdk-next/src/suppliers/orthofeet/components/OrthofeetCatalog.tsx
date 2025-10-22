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
import { OrthofeetSelectedProduct } from './OrthofeetSelectedProduct';

export interface OrthofeetCatalogProps {
  price?: number;
  quantity?: string;
  inventoryBuffer?: number;
  enableInventoryCheck?: boolean;
  isLoading?: boolean;
  selectedSku?: string;
  onAddToCart: (variantSku: string, variantName: string, quantity?: string) => void;
  onRemove?: () => void;
}

export const OrthofeetCatalog = ({
  price,
  quantity,
  inventoryBuffer = 0,
  enableInventoryCheck = false,
  isLoading = false,
  selectedSku,
  onAddToCart,
  onRemove
}: OrthofeetCatalogProps) => {
  // Filter and pagination state
  const [selectedGender, setSelectedGender] = useState<string | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [drawerProductStyle, setDrawerProductStyle] = useState<string | undefined>();
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebouncedValue(searchTerm, 300);
  const [prevSearchTerm, setPrevSearchTerm] = useState(debouncedSearchTerm);
  const [page, setPage] = useState(0);
  const pageSize = 48; // Always fills grid since divisible by 1-4
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const hasSelectedSku = !!(selectedSku && selectedSku.trim());

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

  const handleAddToCart = (variantSku: string, insertQuantity?: string) => {
    // Product name will be fetched by the parent when displaying in OrthofeetSelectedProduct
    onAddToCart(variantSku, '', insertQuantity);
    closeDrawer();
  };

  const openProductDrawer = (productStyle: OrthofeetProductStyle) => {
    setDrawerProductStyle(productStyle.value);
    setTimeout(() => setDrawerOpened(true), 0); // Allow component to mount before opening
  };

  const closeDrawer = () => {
    setDrawerOpened(false);
    setTimeout(() => setDrawerProductStyle(undefined), 300); // Delay for animation to complete
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
        {hasSelectedSku && selectedSku ? (
          <OrthofeetSelectedProduct
            sku={selectedSku}
            price={price}
            quantity={quantity}
            onEdit={(styleName) => {
              setDrawerProductStyle(styleName);
              setTimeout(() => setDrawerOpened(true), 0);
            }}
            onRemove={onRemove!}
          />
        ) : (
          <>
            {/* Search Input */}
            <TextInput
              placeholder="Search for a product"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.currentTarget.value)}
              size="md"
            />

            {/* Filter Buttons */}
            <Group gap="xs" wrap="wrap">
              <Button
                size="compact-sm"
                variant={maxPrice ? 'filled' : 'light'}
                color="indigo"
                onClick={() => {
                  setMaxPrice((current) => (current ? undefined : 60));
                  setPage(0);
                }}
              >
                {maxPrice ? 'Viewing Shoes Under $60' : 'View All Prices'}
              </Button>
              {filters?.genders?.map((gender) => (
                <Button
                  key={gender.value}
                  size="compact-sm"
                  variant={selectedGender === gender.value ? 'filled' : 'light'}
                  onClick={() => {
                    setSelectedGender((current) => (current === gender.value ? undefined : gender.value));
                    setPage(0);
                  }}
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
              onProductSelect={openProductDrawer}
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
          </>
        )}
      </Stack>

      {/* Product Detail Drawer */}
      {drawerProductStyle && (
        <OrthofeetProductDetail
          style={drawerProductStyle}
          price={price}
          quantity={quantity}
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
