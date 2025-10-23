'use client';

import { useFlattenedSubmission, useFormSubmission, useUpsertSubmission } from '@hike/ui';
import { notifications } from '@mantine/notifications';
import { SUPPLIER_ADAPTERS, isSupplierSupported } from '../registry';
import type { SupplierAdapter, SupplierAdapterParams } from '../types';

/**
 * Internal parameters passed to supplier-specific adapters
 */
export interface InternalSupplierAdapterParams extends SupplierAdapterParams {
  formSubmissionData: Record<string, unknown> | undefined;
  upsertSubmission: (data: { workbenchId: string; schemaId: string; data: Record<string, unknown> }) => void;
  isPreFabOrHeatMoldable: boolean;
  isFormLoading: boolean;
}

/**
 * Central hook that returns supplier-specific adapter
 *
 * @param params - Supplier adapter parameters (workbenchId, schemaId, supplierId)
 * @returns Supplier adapter with config, catalog component, and handlers
 *
 * @example
 * ```tsx
 * const adapter = useSupplierAdapter({
 *   supplierId: 'orthofeet-id',
 *   workbenchId: '123',
 *   schemaId: '456'
 * });
 *
 * return adapter?.catalog;
 * ```
 */
export const useSupplierAdapter = (params: SupplierAdapterParams): SupplierAdapter | null => {
  const { supplierId, workbenchId, schemaId } = params;

  // Fetch form submission data
  const { data: formSubmissionData, isPending: isFormSubmissionPending } = useFormSubmission({
    schemaId,
    workbenchId,
    enabled: !!schemaId && !!workbenchId
  });

  // Fetch flattened form submission data
  const { data: formSubmissionFlattenedData, isPending: isFormSubmissionFlattenedPending } = useFlattenedSubmission({
    refetchOnMount: true,
    workbenchId,
    enabled: !!schemaId && !!workbenchId
  });

  // Setup upsert mutation with auto-refetch
  const { mutate: upsertSubmission, isPending: isUpsertSubmissionPending } = useUpsertSubmission({
    onSuccess: () => {
      // Queries will auto-refetch due to cache invalidation
    },
    onError: () => {
      notifications.show({
        title: 'Error adding product to order',
        message: 'There was an error adding the product to the order. Please try again later.',
        color: 'red'
      });
    }
  });

  const isPreFabOrHeatMoldable = formSubmissionFlattenedData?.isPreFabOrHeatMoldable === 'Yes';
  const isFormLoading = isUpsertSubmissionPending || isFormSubmissionPending || isFormSubmissionFlattenedPending;

  // Return null for unsupported suppliers
  if (!isSupplierSupported(supplierId)) {
    return null;
  }

  // Get the appropriate adapter hook and call it with internal params
  const adapterHook = SUPPLIER_ADAPTERS[supplierId];
  if (!adapterHook) {
    return null;
  }

  const internalParams: InternalSupplierAdapterParams = {
    ...params,
    formSubmissionData: formSubmissionData?.data,
    upsertSubmission,
    isPreFabOrHeatMoldable,
    isFormLoading
  };

  const adapter = adapterHook(internalParams);

  // Merge form loading state with adapter loading state
  return {
    ...adapter,
    isLoading: isFormLoading || adapter.isLoading
  };
};
