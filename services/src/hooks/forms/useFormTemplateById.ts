import { FormTemplateResponse } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { findFormTemplateById } from '../../api/form.service';
import { ResponseError } from '../../errors/ResponseError';

export const useFormTemplateById = (
  templateId: string,
  queryOptions?: UseQueryOptions<FormTemplateResponse, ResponseError<null>>
) => {
  return useQuery({
    queryKey: ['findFormTemplateById', templateId],
    queryFn: async () => await findFormTemplateById(templateId),
    ...queryOptions
  });
};
