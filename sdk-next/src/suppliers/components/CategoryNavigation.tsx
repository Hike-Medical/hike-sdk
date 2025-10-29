'use client';

import { ScrollArea, Select, Tabs } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export interface Category {
  value: string;
  label: string;
}

export interface CategoryNavigationProps {
  categories: Category[];
  selectedCategory?: string;
  showAll?: boolean;
  allLabel?: string;
  onCategoryChange: (category: string | undefined) => void;
}

export const CategoryNavigation = ({
  categories,
  selectedCategory,
  showAll = true,
  allLabel = 'All Categories',
  onCategoryChange
}: CategoryNavigationProps) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const handleChange = (value: string | null) => onCategoryChange(value === 'all' || !value ? undefined : value);

  if (isMobile || categories.length >= 10) {
    const selectOptions = showAll ? [{ value: 'all', label: allLabel }, ...categories] : categories;

    return (
      <Select
        data={selectOptions}
        value={selectedCategory || 'all'}
        onChange={(value) => onCategoryChange(value === 'all' || !value ? undefined : value)}
        size="md"
        clearable={!showAll}
        searchable
      />
    );
  }

  // Desktop: Use Tabs with ScrollAre
  return (
    <ScrollArea type="auto">
      <Tabs value={selectedCategory || 'all'} onChange={handleChange}>
        <Tabs.List style={{ flexWrap: 'nowrap' }}>
          {showAll && <Tabs.Tab value="all">{allLabel}</Tabs.Tab>}
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
