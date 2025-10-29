'use client';

import { ScrollArea, Select, Tabs } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useTranslations } from 'next-intl';

interface Category {
  value: string;
  label: string;
}

interface CategoryNavigationProps {
  categories: Category[];
  selectedCategory?: string;
  onCategoryChange: (category: string | undefined) => void;
  showAll?: boolean;
  allLabel?: string;
}

export const CategoryNavigation = ({
  categories,
  selectedCategory,
  onCategoryChange,
  showAll = true,
  allLabel
}: CategoryNavigationProps) => {
  const t = useTranslations('suppliers');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const displayLabel = allLabel || t('allCategories');
  const handleChange = (value: string | null) => onCategoryChange(value === 'all' || !value ? undefined : value);

  if (isMobile || categories.length >= 10) {
    const selectOptions = showAll ? [{ value: 'all', label: displayLabel }, ...categories] : categories;

    return (
      <Select
        data={selectOptions}
        value={selectedCategory || 'all'}
        onChange={handleChange}
        size="md"
        clearable={!showAll}
        searchable
      />
    );
  }

  return (
    <ScrollArea type="auto">
      <Tabs value={selectedCategory || 'all'} onChange={handleChange}>
        <Tabs.List style={{ flexWrap: 'nowrap' }}>
          {showAll && <Tabs.Tab value="all">{displayLabel}</Tabs.Tab>}
          {categories.map((category) => (
            <Tabs.Tab key={category.value} value={category.value}>
              {category.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
    </ScrollArea>
  );
};
