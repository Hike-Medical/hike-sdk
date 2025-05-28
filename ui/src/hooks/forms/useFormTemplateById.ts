import { findFormTemplateById } from '@hike/services';
import { FormTemplateResponse, HikeError } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

export const useFormTemplateById = (
  templateId: string,
  queryOptions?: UseQueryOptions<FormTemplateResponse, HikeError<null>>
) =>
  useQuery({
    queryKey: ['findFormTemplateById', templateId],
    queryFn: async () => await findFormTemplateById(templateId),
    ...queryOptions
  });
