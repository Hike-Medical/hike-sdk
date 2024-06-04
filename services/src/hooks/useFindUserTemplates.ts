import { FormTemplateResponse } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { findUserTemplates } from '../api/form.service';

export const useFindUserTemplates = (
  queryOptions?: Omit<UseQueryOptions<Partial<FormTemplateResponse>[], Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['findUserTemplates'],
    queryFn: async () => await findUserTemplates(),
    ...queryOptions
  });
};
