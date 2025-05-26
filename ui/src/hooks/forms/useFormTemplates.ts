import { HikeError, findFormTemplates } from '@hike/services';
import { FormTemplateResponse } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

export const useFormTemplates = (
  params: {
    withSystemGenerated: boolean;
  },
  queryOptions?: Omit<UseQueryOptions<Partial<FormTemplateResponse>[], HikeError<null>>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['findFormTemplates', params.withSystemGenerated],
    queryFn: async () => await findFormTemplates(params.withSystemGenerated ?? false),
    ...queryOptions
  });
