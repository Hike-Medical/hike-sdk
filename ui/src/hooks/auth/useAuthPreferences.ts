import { findAuthPreferences } from '@hike/services';
import { HikeError, AuthPreferences } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UsePreferencesOptions
  extends Omit<UseQueryOptions<AuthPreferences, HikeError<null>>, 'queryKey' | 'queryFn'> {}

export const useAuthPreferences = ({ ...options }: UsePreferencesOptions) =>
  useQuery({
    queryKey: ['companies', 'auth'],
    queryFn: async () => await findAuthPreferences(),
    ...options
  });
