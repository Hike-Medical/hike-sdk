import { findCompanyPreferences } from '@hike/services';
import type { CompanyPreferences } from '@hike/types';
import { HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseCompanyPreferencesOptions
  extends Omit<UseQueryOptions<CompanyPreferences, HikeError<null>>, 'queryKey' | 'queryFn'> {
  facilityId?: string;
  queryKey?: QueryKey;
}

export const useCompanyPreferences = ({ facilityId, queryKey = [], ...options }: UseCompanyPreferencesOptions = {}) =>
  useQuery({
    queryKey: ['session', 'companies', facilityId, queryKey],
    queryFn: async () => await findCompanyPreferences(facilityId),
    ...options
  });
