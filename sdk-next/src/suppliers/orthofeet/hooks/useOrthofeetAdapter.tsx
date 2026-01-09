'use client';

import { useFetchPricingByProductType, usePreferences } from '@hike/ui';
import type { UseSupplierAdapterParams } from '../../hooks/useSupplierAdapter';
import type { SupplierAdapter } from '../../types';
import { OrthofeetCatalog } from '../components/OrthofeetCatalog';
import { ORTHOFEET_FORM_FIELDS, ORTHOFEET_INVENTORY_BUFFER, ORTHOFEET_SUPPLIER_ID } from '../config';

export const useOrthofeetAdapter = (params: UseSupplierAdapterParams): SupplierAdapter => {
  const { formSubmissionData, upsertSubmission, workbenchId, schemaId, isPreFabOrHeatMoldable } = params;

  const { data: preferences } = usePreferences();

  // When using Hike's Orthofeet warehouse, orders are placed via API with real-time inventory
  // deduction, so no buffer is needed. Otherwise, use the default buffer to prevent overselling.
  const inventoryBuffer = preferences?.useHikeOrthofeetWarehouse ? 0 : ORTHOFEET_INVENTORY_BUFFER;

  // Fetch prefab insert pricing if applicable
  const { data: prefabInsertPricing, isLoading: isPrefabInsertPricingLoading } = useFetchPricingByProductType({
    stripeProductType: 'ORTHOFEET_PREFAB_INSERT',
    enabled: !!isPreFabOrHeatMoldable
  });

  // Extract current selection from form
  const selectedSku = formSubmissionData?.[ORTHOFEET_FORM_FIELDS.sku] as string | undefined;
  const prefabInsertQuantity = formSubmissionData?.[ORTHOFEET_FORM_FIELDS.prefabQuantity] as string | undefined;

  // Handler for adding product to cart (Orthofeet-specific signature)
  const handleAddToCartInternal = (variantSku: string, variantName: string, prefabQuantity?: string) => {
    window.scrollTo(0, 0);

    const submissionData: Record<string, unknown> = {
      ...(formSubmissionData || {}),
      [ORTHOFEET_FORM_FIELDS.sku]: variantSku,
      [ORTHOFEET_FORM_FIELDS.description]: variantName,
      [ORTHOFEET_FORM_FIELDS.heading]: 'Brand: Orthofeet',
      [ORTHOFEET_FORM_FIELDS.supplierId]: ORTHOFEET_SUPPLIER_ID,
      ...(isPreFabOrHeatMoldable &&
        prefabInsertPricing?.amount &&
        prefabQuantity && {
          [ORTHOFEET_FORM_FIELDS.prefabQuantity]: prefabQuantity
        })
    };

    upsertSubmission({
      workbenchId,
      schemaId,
      data: submissionData
    });
  };

  // Standardized handler for external use (matches SupplierAdapter interface)
  const handleAddToCart = (variantSku: string, variantName: string, metadata?: Record<string, unknown>) => {
    const prefabQuantity = metadata?.prefabInsertQuantity as string | undefined;
    handleAddToCartInternal(variantSku, variantName, prefabQuantity);
  };

  // Handler for removing product from cart
  const handleRemove = () => {
    const submissionData: Record<string, unknown> = {
      ...(formSubmissionData || {}),
      [ORTHOFEET_FORM_FIELDS.sku]: '',
      [ORTHOFEET_FORM_FIELDS.description]: '',
      [ORTHOFEET_FORM_FIELDS.heading]: '',
      [ORTHOFEET_FORM_FIELDS.prefabQuantity]: '',
      [ORTHOFEET_FORM_FIELDS.supplierId]: ''
    };

    upsertSubmission({
      workbenchId,
      schemaId,
      data: submissionData
    });
  };

  return {
    config: {
      supplierId: ORTHOFEET_SUPPLIER_ID,
      formFieldMappings: ORTHOFEET_FORM_FIELDS
    },
    catalog: (
      <OrthofeetCatalog
        selectedSku={selectedSku}
        prefabInsertPrice={
          isPreFabOrHeatMoldable && prefabInsertPricing?.amount ? prefabInsertPricing.amount : undefined
        }
        prefabInsertQuantity={prefabInsertQuantity}
        inventoryBuffer={inventoryBuffer}
        enableInventoryCheck
        isLoading={false}
        onAddToCart={handleAddToCartInternal}
        onRemove={handleRemove}
      />
    ),
    handlers: {
      onAddToCart: handleAddToCart,
      onRemove: handleRemove
    },
    isProductSelected: !!selectedSku,
    isLoading: isPrefabInsertPricingLoading,
    error: null
  };
};
