import { findAuthPreferences, findCompanyBySlug } from '@hike/services';
import { HikeError, AuthPreferences } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseAuthPreferencesBySlugOptions
  extends Omit<UseQueryOptions<AuthPreferences, HikeError<null>>, 'queryKey' | 'queryFn'> {
  slug: string;
}

export const useAuthPreferencesBySlug = ({ slug, ...options }: UseAuthPreferencesBySlugOptions) =>
  useQuery({
    queryKey: ['companies', 'auth', 'slug', slug],
    queryFn: async () => {
      const company = await findCompanyBySlug(slug);
      return await findAuthPreferences(company.id);
    },
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
    refetchOnWindowFocus: false, // Don't refetch on window focus for auth preferences
    retry: 1, 
    ...options
  });

