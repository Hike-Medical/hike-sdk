import { HikeError, findFormTemplates } from '@hike/services';
import { FormTemplateResponse } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

export const useFormTemplates = (
  queryOptions?: Omit<UseQueryOptions<Partial<FormTemplateResponse>[], HikeError<null>>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['findFormTemplates'],
    queryFn: async () => await findFormTemplates(),
    ...queryOptions
  });
