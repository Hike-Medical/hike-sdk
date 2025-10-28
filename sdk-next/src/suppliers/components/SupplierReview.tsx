'use client';

import { Alert, Paper, Stack, Text } from '@mantine/core';
import Image from 'next/image';
import { OrthofeetReview } from '../orthofeet/components/OrthofeetReview';
import { ORTHOFEET_SUPPLIER_ID } from '../orthofeet/config';
import { type SupplierProduct } from '../types';

interface SupplierReviewProps {
  products: SupplierProduct[];
}

export const SupplierReview = ({ products }: SupplierReviewProps) => {
  if (!products?.length) {
    return null;
  }

  return (
    <Stack gap="md">
      {products.map((product) => {
        // Route to supplier-specific review component
        if (product.supplierId === ORTHOFEET_SUPPLIER_ID) {
          return <OrthofeetReview key={product.sku} sku={product.sku} />;
        }

        // Fallback generic review for unknown suppliers
        return (
          <Paper key={product.sku} p="md" withBorder>
            <Stack gap="xs">
              {product.image && (
                <Image
                  src={product.image}
                  alt={product.name || 'Product'}
                  width={600}
                  height={400}
                  style={{ borderRadius: 8, objectFit: 'cover' }}
                />
              )}
              <Text size="md" fw="500">
                {product.name || 'Unknown Product'}
              </Text>
              <Text size="sm" c="dimmed">
                SKU: {product.sku}
              </Text>
              {product.price && (
                <Text size="md" fw="600">
                  Price: ${product.price.toFixed(2)}
                </Text>
              )}
              <Alert color="blue" title="Supplier Catalog">
                This product is from a supplier catalog. Contact support for details.
              </Alert>
            </Stack>
          </Paper>
        );
      })}
    </Stack>
  );
};
