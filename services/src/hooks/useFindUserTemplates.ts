import { UserTemplateResponse } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { findUserTemplates } from '../api/form.service';

export const useFindUserTemplates = (queryOptions?: UseQueryOptions<Partial<UserTemplateResponse>[], Error>) => {
  return useQuery({
    queryKey: ['findUserTemplates'],
    queryFn: async () => await findUserTemplates(),
    ...queryOptions
  });
};
