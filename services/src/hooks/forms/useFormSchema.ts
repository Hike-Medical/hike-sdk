import type { FormSchemaTyped } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { findFormSchemaById } from '../../api/form.service';
import { HikeError } from '../../errors/HikeError';

interface UseFormSchemaOptions extends Omit<UseQueryOptions<FormSchemaTyped, HikeError<null>>, 'queryKey' | 'queryFn'> {
  schemaId: string;
  templateable?: boolean;
  enabled?: boolean;
  queryKey?: QueryKey;
}

export const useFormSchema = ({ schemaId, templateable, queryKey = [], ...options }: UseFormSchemaOptions) =>
  useQuery({
    queryKey: ['formSchema', schemaId, templateable, queryKey],
    queryFn: async () => await findFormSchemaById(schemaId, templateable),
    ...options
  });
