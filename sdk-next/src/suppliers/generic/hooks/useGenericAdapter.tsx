'use client';

import { useSuppliers } from '@hike/ui';
import { useMemo } from 'react';
import type { UseSupplierAdapterParams } from '../../hooks/useSupplierAdapter';
import type { SupplierAdapter } from '../../types';
import { GenericCatalog } from '../components/GenericCatalog';

/**
 * Form field keys for generic catalog products.
 * Can be overridden per supplier if needed.
 */
const getFormFieldKeys = (supplierId: string) => ({
  sku: `order${supplierId}SKU`,
  description: `order${supplierId}Description`,
  heading: `order${supplierId}Heading`
});

/**
 * Generic adapter for suppliers without custom implementations.
 * Provides a simple catalog interface using the standard catalog products API.
 */
export const useGenericAdapter = (params: UseSupplierAdapterParams): SupplierAdapter => {
  const { formSubmissionData, upsertSubmission, workbenchId, schemaId, supplierId } = params;

  // Fetch supplier info for display name
  const { data: suppliersResponse, isLoading: isSupplierLoading } = useSuppliers({
    params: { ids: [supplierId], limit: 1 },
    enabled: !!supplierId
  });

  const supplier = useMemo(() => suppliersResponse?.data?.[0], [suppliersResponse]);

  const formFields = getFormFieldKeys(supplierId);

  // Extract current selection from form
  const selectedSku = formSubmissionData?.[formFields.sku] as string | undefined;

  // Handler for adding product to cart
  const handleAddToCart = (variantSku: string, variantName: string) => {
    window.scrollTo(0, 0);

    const submissionData: Record<string, unknown> = {
      ...(formSubmissionData || {}),
      [formFields.sku]: variantSku,
      [formFields.description]: variantName,
      [formFields.heading]: `Brand: ${supplier?.name || 'Supplier'}`
    };

    upsertSubmission({
      workbenchId,
      schemaId,
      data: submissionData
    });
  };

  // Handler for removing product from cart
  const handleRemove = () => {
    const submissionData: Record<string, unknown> = {
      ...(formSubmissionData || {}),
      [formFields.sku]: '',
      [formFields.description]: '',
      [formFields.heading]: ''
    };

    upsertSubmission({
      workbenchId,
      schemaId,
      data: submissionData
    });
  };

  return {
    config: {
      supplierId,
      formFieldMappings: formFields
    },
    catalog: (
      <GenericCatalog
        supplierId={supplierId}
        supplierName={supplier?.name}
        selectedSku={selectedSku}
        onAddToCart={handleAddToCart}
        onRemove={handleRemove}
      />
    ),
    handlers: {
      onAddToCart: handleAddToCart,
      onRemove: handleRemove
    },
    isLoading: isSupplierLoading,
    error: null
  };
};
