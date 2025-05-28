import { findFormSchemas } from '@hike/services';
import { FormSchemaTyped, GetFormSchemasParams, HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseFormSchemasOptions
  extends Omit<UseQueryOptions<FormSchemaTyped[] | null, HikeError<null>>, 'queryKey' | 'queryFn'> {
  params?: GetFormSchemasParams;
  queryKey?: QueryKey;
}

export const useFormSchemas = ({ queryKey = [], params, ...options }: UseFormSchemasOptions = {}) =>
  useQuery({
    queryKey: ['formSchemas', queryKey, params],
    queryFn: async () => await findFormSchemas(params),
    ...options
  });
