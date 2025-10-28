'use client';

import { useSuppliers } from '@hike/ui';
import { Alert, Box, LoadingOverlay, Select } from '@mantine/core';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSupplierAdapter } from '../hooks/useSupplierAdapter';

interface SupplierCatalogSelectorProps {
  suppliers?: {
    id: string;
    excludedSlugs?: string[];
  }[];
}

export const SupplierCatalogSelector = ({ suppliers = [] }: SupplierCatalogSelectorProps) => {
  const params = useParams<{
    slug: string;
    patientId: string;
    workbenchId: string;
    schemaId: string;
  }>();

  // Filter suppliers based on excluded slugs (React Compiler will memoize)
  const filteredSuppliers = suppliers.filter((supplier) => !(supplier.excludedSlugs?.includes(params.slug) ?? false));

  const [activeSupplierId, setActiveSupplier] = useState<string | null>(filteredSuppliers[0]?.id ?? null);

  // Update active supplier if filtered list changes and current selection is invalid
  useEffect(() => {
    const firstSupplier = filteredSuppliers[0];
    if (firstSupplier && !activeSupplierId) {
      setActiveSupplier(firstSupplier.id);
    }
  }, [filteredSuppliers, activeSupplierId]);

  // Fetch supplier details by IDs (React Compiler will memoize)
  const supplierIds = filteredSuppliers.map((s) => s.id);
  const { data: suppliersResponse, isPending: isSuppliersLoading } = useSuppliers({
    params: { ids: supplierIds, limit: 100 },
    enabled: supplierIds.length > 0
  });

  // Prepare supplier options for Select (React Compiler will memoize)
  const supplierOptions =
    suppliersResponse?.data.map((supplier) => ({
      value: supplier.id,
      label: supplier.name
    })) ?? [];

  // Use idiomatic destructuring pattern
  const { catalog, isLoading, isSupported } = useSupplierAdapter({
    supplierId: activeSupplierId || '',
    workbenchId: params.workbenchId,
    schemaId: params.schemaId
  });

  // Show error if no suppliers are available
  if (filteredSuppliers.length === 0) {
    return (
      <Alert color="yellow" title="No suppliers available">
        No supplier catalogs are available for this form. Please contact support.
      </Alert>
    );
  }

  // Show loading while waiting for data
  if (!activeSupplierId || isSuppliersLoading || isLoading) {
    return <LoadingOverlay visible />;
  }

  // Show error if supplier is not supported
  if (!isSupported) {
    return (
      <Alert color="yellow" title="Supplier catalog not implemented">
        This supplier does not have a catalog implementation yet. Please contact support.
      </Alert>
    );
  }

  return (
    <Box>
      {supplierOptions.length > 1 && (
        <Select
          data={supplierOptions}
          value={activeSupplierId}
          label="Select Brand"
          onChange={setActiveSupplier}
          size="sm"
          maw={250}
          mb="md"
        />
      )}
      {catalog}
    </Box>
  );
};
