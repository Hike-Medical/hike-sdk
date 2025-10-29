'use client';

import { TextInput } from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons-react';
import { ReactNode } from 'react';

export interface CatalogSearchBarProps {
  value: string;
  placeholder?: string;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  onChange: (value: string) => void;
}

export const CatalogSearchBar = ({
  value,
  onChange,
  placeholder = 'Search products...',
  leftSection,
  rightSection,
  size = 'md'
}: CatalogSearchBarProps) => {
  const handleClear = () => onChange('');

  const defaultLeftSection = leftSection ?? <IconSearch size={18} />;
  const defaultRightSection =
    rightSection ?? (value ? <IconX size={16} style={{ cursor: 'pointer' }} onClick={handleClear} /> : null);

  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
      size={size}
      leftSection={defaultLeftSection}
      rightSection={defaultRightSection}
    />
  );
};
