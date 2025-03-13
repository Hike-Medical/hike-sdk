import { FormTemplateResponse } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { findFormTemplates } from '../../api/form.service';
import { HikeError } from '../../errors/HikeError';

export const useFormTemplates = (
  queryOptions?: Omit<UseQueryOptions<Partial<FormTemplateResponse>[], HikeError<null>>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['findFormTemplates'],
    queryFn: async () => await findFormTemplates(),
    ...queryOptions
  });
