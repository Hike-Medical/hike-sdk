'use client';

import { Stack } from '@mantine/core';
import { GenericReview } from '../generic/components/GenericReview';
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
        switch (product.supplierId) {
          case ORTHOFEET_SUPPLIER_ID:
            return <OrthofeetReview key={product.sku} sku={product.sku} metadata={product.metadata} />;
          default:
            return <GenericReview key={product.sku} sku={product.sku} metadata={product.metadata} />;
        }
      })}
    </Stack>
  );
};
