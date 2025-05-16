'use client';

import { useCompaniesByName } from '@hike/ui';
import { Combobox, Loader, TextInput, useCombobox } from '@mantine/core';
import debounce from 'lodash/debounce';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';

interface SelectCompanyProps {
  w?: string | number;
  forEnroll?: boolean;
  onSelect: (value: string | null) => void;
}

export const SelectCompany = ({ w, forEnroll, onSelect }: SelectCompanyProps) => {
  const minSearchLength = 3;
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const t = useTranslations('components.selectCompany');

  const combobox = useCombobox();

  const { data: companies, isFetching } = useCompaniesByName({
    name: debouncedSearch,
    params: { forEnroll },
    enabled: debouncedSearch.length >= minSearchLength,
    staleTime: 300000
  });

  const debouncedSetSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearch(value);
      }, 300),
    []
  );

  useEffect(() => {
    debouncedSetSearch(search);
  }, [search, debouncedSetSearch]);

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(value) => {
        setSearch(companies?.find((company) => company.slug === value)?.name ?? '');
        onSelect(value);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <TextInput
          label={t('label')}
          placeholder={t('placeholder')}
          value={search}
          onChange={(event) => {
            setSearch(event.currentTarget.value);
            onSelect(null);
            combobox.resetSelectedOption();
            combobox.openDropdown();
          }}
          onClick={() => {
            if (companies?.length) {
              combobox.openDropdown();
            }
          }}
          onFocus={() => {
            if (companies?.length) {
              combobox.openDropdown();
            }
          }}
          onBlur={() => combobox.closeDropdown()}
          rightSection={isFetching || search !== debouncedSearch ? <Loader size="xs" /> : null}
          autoComplete="off"
          autoCorrect="off"
          w={w}
          required
        />
      </Combobox.Target>
      <Combobox.Dropdown>
        {companies?.length ? (
          companies.map((item) => (
            <Combobox.Option key={item.slug} value={item.slug}>
              {item.name}
            </Combobox.Option>
          ))
        ) : (
          <Combobox.Empty>
            {debouncedSearch.length >= minSearchLength
              ? t('noResults')
              : t.rich('minSearchLength', { length: minSearchLength })}
          </Combobox.Empty>
        )}
      </Combobox.Dropdown>
    </Combobox>
  );
};
