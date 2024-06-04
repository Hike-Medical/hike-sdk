import { UserTemplateResponse } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { findUserTemplates } from '../api/form.service';

export const useFindUserTemplates = (
  queryOptions?: Omit<UseQueryOptions<Partial<UserTemplateResponse>[], Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['findUserTemplates'],
    queryFn: async () => await findUserTemplates(),
    ...queryOptions
  });
};
