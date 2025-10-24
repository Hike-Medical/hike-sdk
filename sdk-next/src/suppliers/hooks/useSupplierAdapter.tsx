'use client';

import { useFlattenedSubmission, useFormSubmission, useUpsertSubmission } from '@hike/ui';
import { notifications } from '@mantine/notifications';
import { useMemo } from 'react';
import { SUPPLIER_ADAPTERS, isSupplierSupported } from '../registry';
import type { SupplierAdapterParams } from '../types';

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
 * Return type for useSupplierAdapter hook
 */
export interface UseSupplierAdapterResult {
  catalog: React.ReactNode | null;
  isLoading: boolean;
  isSupported: boolean;
}

/**
 * Central hook that returns supplier-specific adapter
 *
 * @param params - Supplier adapter parameters (workbenchId, schemaId, supplierId)
 * @returns Object with catalog component, loading state, and support status
 *
 * @example
 * ```tsx
 * const { catalog, isLoading, isSupported } = useSupplierAdapter({
 *   supplierId: 'orthofeet-id',
 *   workbenchId: '123',
 *   schemaId: '456'
 * });
 *
 * if (!isSupported) return <Alert>Not supported</Alert>;
 * if (isLoading) return <LoadingOverlay />;
 * return catalog;
 * ```
 */
export const useSupplierAdapter = (params: SupplierAdapterParams): UseSupplierAdapterResult => {
  const { supplierId, workbenchId, schemaId } = params;

  // Fetch form submission data (always called - stable hook order)
  const { data: formSubmissionData, isPending: isFormSubmissionPending } = useFormSubmission({
    schemaId,
    workbenchId,
    enabled: !!schemaId && !!workbenchId
  });

  // Fetch flattened form submission data (always called - stable hook order)
  const { data: formSubmissionFlattenedData, isPending: isFormSubmissionFlattenedPending } = useFlattenedSubmission({
    refetchOnMount: true,
    workbenchId,
    enabled: !!schemaId && !!workbenchId
  });

  // Setup upsert mutation (always called - stable hook order)
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

  // Check if supplier is supported
  const isSupported = isSupplierSupported(supplierId);
  const adapterHook = isSupported ? SUPPLIER_ADAPTERS[supplierId] : null;

  // Prepare internal params
  const internalParams: InternalSupplierAdapterParams = useMemo(
    () => ({
      ...params,
      formSubmissionData: formSubmissionData?.data,
      upsertSubmission,
      isPreFabOrHeatMoldable,
      isFormLoading
    }),
    [params, formSubmissionData?.data, upsertSubmission, isPreFabOrHeatMoldable, isFormLoading]
  );

  // Call adapter hook unconditionally (stable hook order - React Compiler ready)
  // All registered adapters MUST have stable hook implementations
  const adapter = adapterHook?.(internalParams) ?? null;

  // Return idiomatic destructurable object
  return {
    catalog: adapter?.catalog ?? null,
    isLoading: isFormLoading || (adapter?.isLoading ?? false),
    isSupported
  };
};
