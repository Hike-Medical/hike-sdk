import { FormTemplateResponse } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { findFormTemplates } from '../api/form.service';

export const useFindFormTemplates = (
  queryOptions?: Omit<UseQueryOptions<Partial<FormTemplateResponse>[], Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['findFormTemplates'],
    queryFn: async () => await findFormTemplates(),
    ...queryOptions
  });
};
