import { findPreferences } from '@hike/services';
import type { CompanyPreferences } from '@hike/types';
import { HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UsePreferencesOptions
  extends Omit<UseQueryOptions<CompanyPreferences, HikeError<null>>, 'queryKey' | 'queryFn'> {
  facilityId?: string;
  queryKey?: QueryKey;
}

export const usePreferences = ({ facilityId, queryKey = [], ...options }: UsePreferencesOptions = {}) =>
  useQuery({
    queryKey: ['session', 'companies', facilityId, queryKey],
    queryFn: async () => await findPreferences(facilityId),
    ...options
  });
