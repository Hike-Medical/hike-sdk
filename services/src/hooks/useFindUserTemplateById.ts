import { FormTemplateResponse } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { findUserTemplateById } from '../api/form.service';

export const useFindUserTemplateById = (
  userTemplateId: string,
  queryOptions?: UseQueryOptions<FormTemplateResponse, Error>
) => {
  return useQuery({
    queryKey: ['findUserTemplateById', userTemplateId],
    queryFn: async () => await findUserTemplateById(userTemplateId),
    ...queryOptions
  });
};
