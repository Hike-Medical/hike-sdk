import type { FormSchemaTyped } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { findFormSchemaById } from '../api/form.service';
import { ResponseError } from '../errors/ResponseError';

export interface UseFormSchemaOptions
  extends Omit<UseQueryOptions<FormSchemaTyped | null, ResponseError<null>>, 'queryKey' | 'queryFn'> {
  schemaId: string;
  enabled?: boolean;
  queryKey?: QueryKey;
}

export const useFormSchema = ({ schemaId, queryKey = [], ...options }: UseFormSchemaOptions) =>
  useQuery({
    queryKey: ['formSchema', schemaId, queryKey],
    queryFn: async () => await findFormSchemaById(schemaId),
    ...options
  });
