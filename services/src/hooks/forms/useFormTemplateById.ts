import { FormTemplateResponse } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { findFormTemplateById } from '../../api/form.service';
import { HikeError } from '../../errors/HikeError';

export const useFormTemplateById = (
  templateId: string,
  queryOptions?: UseQueryOptions<FormTemplateResponse, HikeError<null>>
) =>
  useQuery({
    queryKey: ['findFormTemplateById', templateId],
    queryFn: async () => await findFormTemplateById(templateId),
    ...queryOptions
  });
