import { HikeError, findFormSchemas } from '@hike/services';
import { FormSchemaType, FormSchemaTyped } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseFormSchemasOptions
  extends Omit<UseQueryOptions<FormSchemaTyped[] | null, HikeError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
  formSchemaTypes?: (FormSchemaType | null)[];
}

export const useFormSchemas = ({ queryKey = [], formSchemaTypes, ...options }: UseFormSchemasOptions = {}) =>
  useQuery({
    queryKey: ['formSchemas', queryKey],
    queryFn: async () => await findFormSchemas(formSchemaTypes),
    ...options
  });
