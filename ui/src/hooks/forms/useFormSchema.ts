import { HikeError, findFormSchemaById } from '@hike/services';
import type { FormSchemaTyped } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

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
