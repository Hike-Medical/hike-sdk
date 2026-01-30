'use client';

import { useSuppliers } from '@hike/ui';
import { Alert, LoadingOverlay, Select, Stack } from '@mantine/core';
import { IconBuilding } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSupplierAdapter } from '../hooks/useSupplierAdapter';

interface SupplierCatalogSelectorProps {
  suppliers?: {
    id: string;
    excludedSlugs?: string[];
  }[];
}

interface SupplierCatalogRendererProps {
  supplierId: string;
  workbenchId: string;
  schemaId: string;
  supplierOptions: { value: string; label: string }[];
  onSupplierChange: (supplierId: string) => void;
}

/**
 * Inner component that calls useSupplierAdapter
 * Remounts when supplierId changes via key prop to maintain stable hook order
 */
const SupplierCatalogRenderer = ({
  supplierId,
  workbenchId,
  schemaId,
  supplierOptions,
  onSupplierChange
}: SupplierCatalogRendererProps) => {
  const { catalog, isLoading, isProductSelected } = useSupplierAdapter({
    supplierId,
    workbenchId,
    schemaId
  });

  if (isLoading) {
    return <LoadingOverlay visible />;
  }

  return (
    <Stack gap="0">
      {supplierOptions.length > 1 && !isProductSelected && (
        <Select
          data={supplierOptions}
          value={supplierId}
          onChange={(value) => value && onSupplierChange(value)}
          label="Select Brand"
          placeholder="Choose a supplier"
          leftSection={<IconBuilding size={18} />}
          size="md"
          flex={1}
          searchable
          styles={{
            input: {
              fontWeight: 500
            }
          }}
        />
      )}
      {catalog}
    </Stack>
  );
};

export const SupplierCatalogSelector = ({ suppliers = [] }: SupplierCatalogSelectorProps) => {
  const t = useTranslations('suppliers');

  const params = useParams<{
    slug: string;
    patientId: string;
    workbenchId: string;
    schemaId: string;
  }>();

  const filteredSuppliers = suppliers.filter((supplier) => !(supplier.excludedSlugs?.includes(params.slug) ?? false));
  const [activeSupplierId, setActiveSupplier] = useState<string | null>(filteredSuppliers[0]?.id ?? null);

  useEffect(() => {
    const firstSupplier = filteredSuppliers[0];
    if (firstSupplier && !activeSupplierId) {
      setActiveSupplier(firstSupplier.id);
    }
  }, [filteredSuppliers, activeSupplierId]);

  const supplierIds = filteredSuppliers.map((s) => s.id);

  const { data: suppliersResponse, isPending: isSuppliersLoading } = useSuppliers({
    params: { ids: supplierIds, limit: 100 },
    enabled: supplierIds.length > 0
  });

  const supplierOptions =
    suppliersResponse?.data.map((supplier) => ({
      value: supplier.id,
      label: supplier.name
    })) ?? [];

  if (filteredSuppliers.length === 0) {
    return (
      <Alert color="yellow" title={t('noSuppliersAvailableTitle')}>
        {t('noSuppliersAvailableMessage')}
      </Alert>
    );
  }

  if (!activeSupplierId || isSuppliersLoading) {
    return <LoadingOverlay visible />;
  }

  return (
    <SupplierCatalogRenderer
      key={activeSupplierId}
      supplierId={activeSupplierId}
      workbenchId={params.workbenchId}
      schemaId={params.schemaId}
      supplierOptions={supplierOptions}
      onSupplierChange={setActiveSupplier}
    />
  );
};
