import { findOidcPreferences } from '@hike/services';
import { HikeError, OidcSettings } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UsePreferencesOptions extends Omit<UseQueryOptions<OidcSettings, HikeError<null>>, 'queryKey' | 'queryFn'> {
  slug: string;
}

export const useOidcPreferences = ({ slug, ...options }: UsePreferencesOptions) =>
  useQuery({
    queryKey: ['companies', 'oidc', slug],
    queryFn: async () => await findOidcPreferences(slug),
    ...options
  });
