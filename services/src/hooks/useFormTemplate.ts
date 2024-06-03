import type { FormTemplateExtended } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { findFormTemplateById } from '../api/form.service';
import { ResponseError } from '../errors/ResponseError';

export interface UseFormTemplateOptions
  extends Omit<UseQueryOptions<FormTemplateExtended | null, ResponseError<null>>, 'queryKey' | 'queryFn'> {
  templateId: string;
  templateable?: boolean;
  enabled?: boolean;
  queryKey?: QueryKey;
}

export const useFormTemplate = ({ templateId, templateable, queryKey = [], ...options }: UseFormTemplateOptions) => {
  const key = ['formTemplate', templateId, ...queryKey];

  const query = useQuery({
    queryKey: key,
    queryFn: async () => await findFormTemplateById(templateId, templateable),
    ...options
  });

  return {
    queryKey: key,
    ...query
  };
};
