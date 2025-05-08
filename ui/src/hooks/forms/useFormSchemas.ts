import { HikeError, findFormSchemas } from '@hike/services';
import type { FormSchemaTyped } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseFormSchemasOptions
  extends Omit<UseQueryOptions<FormSchemaTyped[] | null, HikeError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
}

export const useFormSchemas = ({ queryKey = [], ...options }: UseFormSchemasOptions = {}) =>
  useQuery({
    queryKey: ['formSchemas', queryKey],
    queryFn: async () => await findFormSchemas(),
    ...options
  });
