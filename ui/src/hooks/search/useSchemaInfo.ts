import { getSchemaInfo, SchemaInfo } from '@hike/services';
import { HikeError } from '@hike/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseSchemaInfoOptions extends Omit<UseQueryOptions<SchemaInfo, HikeError<null>>, 'queryFn' | 'queryKey'> {
  enabled?: boolean;
}

export const useSchemaInfo = ({ enabled = true, ...options }: UseSchemaInfoOptions) => {
  return useQuery({
    queryKey: ['schemaInfo'],
    queryFn: async () => await getSchemaInfo(),
    enabled,
    ...options
  });
};
