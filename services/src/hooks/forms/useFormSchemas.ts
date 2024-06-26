import type { FormSchemaTyped } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { findFormSchemasByIds } from '../../api/form.service';
import { ResponseError } from '../../errors/ResponseError';

export interface UseFormSchemasOptions
  extends Omit<UseQueryOptions<FormSchemaTyped[] | null, ResponseError<null>>, 'queryKey' | 'queryFn'> {
  schemaIds: string[];
  queryKey?: QueryKey;
}

export const useFormSchemas = ({ schemaIds, queryKey = [], ...options }: UseFormSchemasOptions) =>
  useQuery({
    queryKey: ['formSchemas', schemaIds, queryKey],
    queryFn: async () => await findFormSchemasByIds(schemaIds),
    ...options
  });
