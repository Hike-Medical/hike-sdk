'use client';

import { useSuppliers } from '@hike/ui';
import type { UseSupplierAdapterParams } from '../../hooks/useSupplierAdapter';
import type { SupplierAdapter } from '../../types';
import { GenericCatalog } from '../components/GenericCatalog';

/**
 * Generic adapter for suppliers without custom implementations.
 * Provides a simple catalog interface using the standard catalog products API.
 */
export const useGenericAdapter = (params: UseSupplierAdapterParams): SupplierAdapter => {
  // TODO: Migrate legacy implementation to supplier-specific form fields
  const formFields = {
    sku: 'orderOrthofeetFootwearSKU',
    description: 'orderOrthofeetFootwearDescription',
    heading: 'orderOrthofeetFootwearHeading',
    supplierId: 'orderOrthofeetFootwearSupplierId'
  };

  const { formSubmissionData, upsertSubmission, workbenchId, schemaId, supplierId } = params;

  const { data: suppliersResponse, isLoading: isSupplierLoading } = useSuppliers({
    params: { ids: [supplierId], limit: 1 },
    enabled: !!supplierId
  });

  const supplier = suppliersResponse?.data?.[0];
  const selectedSku = formSubmissionData?.[formFields.sku] as string | undefined;

  const handleAddToCart = (variantSku: string, variantName: string) => {
    window.scrollTo(0, 0);

    const submissionData: Record<string, unknown> = {
      ...(formSubmissionData || {}),
      [formFields.sku]: variantSku,
      [formFields.description]: variantName,
      [formFields.heading]: `Brand: ${supplier?.name || 'Supplier'}`,
      [formFields.supplierId]: supplierId
    };

    upsertSubmission({
      workbenchId,
      schemaId,
      data: submissionData
    });
  };

  const handleRemove = () => {
    const submissionData: Record<string, unknown> = {
      ...(formSubmissionData || {}),
      [formFields.sku]: '',
      [formFields.description]: '',
      [formFields.heading]: '',
      [formFields.supplierId]: ''
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
        selectedSku={selectedSku}
        onAddToCart={handleAddToCart}
        onRemove={handleRemove}
      />
    ),
    handlers: {
      onAddToCart: handleAddToCart,
      onRemove: handleRemove
    },
    isProductSelected: !!selectedSku,
    isLoading: isSupplierLoading,
    error: null
  };
};
