import { getEnumValues } from '@hike/services';
import { HikeError } from '@hike/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseEnumValuesOptions
  extends Omit<UseQueryOptions<Record<string, string[]>, HikeError<null>>, 'queryFn' | 'queryKey'> {
  enabled?: boolean;
}

export const useEnumValues = ({ enabled = true, ...options }: UseEnumValuesOptions = {}) => {
  return useQuery({
    queryKey: ['enumValues'],
    queryFn: async () => await getEnumValues(),
    enabled,
    ...options
  });
};
