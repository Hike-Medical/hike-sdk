import { findCompanyPreferences } from '@hike/services';
import type { CompanyPreferences } from '@hike/types';
import { HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseCompanyPreferencesOptions
  extends Omit<UseQueryOptions<CompanyPreferences, HikeError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
}

export const useCompanyPreferences = ({ queryKey = [], ...options }: UseCompanyPreferencesOptions = {}) =>
  useQuery({
    queryKey: ['session', 'companies', queryKey],
    queryFn: async () => await findCompanyPreferences(),
    ...options
  });
