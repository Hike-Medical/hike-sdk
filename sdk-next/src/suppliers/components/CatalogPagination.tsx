'use client';

import { Group, Pagination } from '@mantine/core';
import { RefObject, useEffect } from 'react';

export interface CatalogPaginationProps {
  totalPages: number;
  currentPage: number;
  scrollRef?: RefObject<HTMLDivElement | null>;
  onPageChange: (page: number) => void;
}

export const CatalogPagination = ({ totalPages, currentPage, onPageChange, scrollRef }: CatalogPaginationProps) => {
  useEffect(() => {
    if (scrollRef?.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage, scrollRef]);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <Group justify="center" mt="xl">
      <Pagination total={totalPages} value={currentPage + 1} onChange={(newPage) => onPageChange(newPage - 1)} />
    </Group>
  );
};
