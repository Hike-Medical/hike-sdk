'use client';

import { TextInput } from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

export interface CatalogSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const CatalogSearchBar = ({ value, onChange }: CatalogSearchBarProps) => {
  const t = useTranslations('suppliers');

  return (
    <TextInput
      placeholder={t('searchPlaceholder')}
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
      size="md"
      leftSection={<IconSearch size={18} />}
      rightSection={value ? <IconX size={16} style={{ cursor: 'pointer' }} onClick={() => onChange('')} /> : null}
    />
  );
};
