import { FormTemplateResponse } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { findFormTemplates } from '../../api/form.service';
import { ResponseError } from '../../errors/ResponseError';

export const useFormTemplates = (
  queryOptions?: Omit<UseQueryOptions<Partial<FormTemplateResponse>[], ResponseError<null>>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['findFormTemplates'],
    queryFn: async () => await findFormTemplates(),
    ...queryOptions
  });
};
