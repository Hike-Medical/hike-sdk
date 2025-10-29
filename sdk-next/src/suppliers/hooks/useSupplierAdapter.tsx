'use client';

import { useFlattenedSubmission, useFormSubmission, useUpsertSubmission } from '@hike/ui';
import { notifications } from '@mantine/notifications';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { useGenericAdapter } from '../generic';
import { SUPPLIER_ADAPTERS, isSupplierSupported } from '../registry';
import type { SupplierAdapterParams } from '../types';

export interface UseSupplierAdapterParams extends SupplierAdapterParams {
  formSubmissionData: Record<string, unknown> | undefined;
  upsertSubmission: (data: { workbenchId: string; schemaId: string; data: Record<string, unknown> }) => void;
  isPreFabOrHeatMoldable: boolean;
  isFormLoading: boolean;
}

export interface UseSupplierAdapterResult {
  catalog: React.ReactNode | null;
  isLoading: boolean;
  isSupported: boolean;
  isCustomAdapter: boolean;
}

/**
 * Central hook that returns supplier-specific adapter.
 * Falls back to generic adapter for unsupported suppliers.
 */
export const useSupplierAdapter = (params: SupplierAdapterParams): UseSupplierAdapterResult => {
  const { supplierId, workbenchId, schemaId } = params;
  const queryClient = useQueryClient();
  const t = useTranslations('suppliers');

  const { data: formSubmissionData, isPending: isFormSubmissionPending } = useFormSubmission({
    schemaId,
    workbenchId,
    enabled: !!schemaId && !!workbenchId
  });

  const { data: formSubmissionFlattenedData, isPending: isFormSubmissionFlattenedPending } = useFlattenedSubmission({
    refetchOnMount: true,
    workbenchId,
    enabled: !!schemaId && !!workbenchId
  });

  const { mutate: upsertSubmission, isPending: isUpsertSubmissionPending } = useUpsertSubmission({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['formSubmission', schemaId, workbenchId] });
      queryClient.invalidateQueries({ queryKey: ['flattenedSubmission', workbenchId] });
    },
    onError: () => {
      notifications.show({
        title: t('errorAddingProductTitle'),
        message: t('errorAddingProductMessage'),
        color: 'red'
      });
    }
  });

  const isPreFabOrHeatMoldable = formSubmissionFlattenedData?.isPreFabOrHeatMoldable === 'Yes';
  const isFormLoading = isUpsertSubmissionPending || isFormSubmissionPending || isFormSubmissionFlattenedPending;
  const hasCustomAdapter = isSupplierSupported(supplierId);

  const internalParams: UseSupplierAdapterParams = useMemo(
    () => ({
      ...params,
      formSubmissionData: formSubmissionData?.data,
      upsertSubmission,
      isPreFabOrHeatMoldable,
      isFormLoading
    }),
    [params, formSubmissionData?.data, upsertSubmission, isPreFabOrHeatMoldable, isFormLoading]
  );

  // Use custom adapter if available, otherwise use generic adapter
  const adapterHook = SUPPLIER_ADAPTERS[supplierId] || useGenericAdapter;
  const adapter = adapterHook(internalParams);

  return {
    catalog: adapter?.catalog ?? null,
    isLoading: isFormLoading || (adapter?.isLoading ?? false),
    isSupported: true, // Always supported now (either custom or generic)
    isCustomAdapter: hasCustomAdapter
  };
};
