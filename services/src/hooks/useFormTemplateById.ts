import { FormTemplateResponse } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { findFormTemplateById } from '../api/form.service';

export const useFindFormTemplateById = (
  templateId: string,
  queryOptions?: UseQueryOptions<FormTemplateResponse, Error>
) => {
  return useQuery({
    queryKey: ['findFormTemplateById', templateId],
    queryFn: async () => await findFormTemplateById(templateId),
    ...queryOptions
  });
};
