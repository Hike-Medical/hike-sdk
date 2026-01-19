import { fetchEmailTemplates } from '@hike/services';
import { EmailTemplateExtended, GetEmailTemplatesParams, HikeError, PagedResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseGetEmailTemplatesOptions
  extends Omit<UseQueryOptions<PagedResponse<EmailTemplateExtended[]>, HikeError<null>>, 'queryKey' | 'queryFn'> {
  params?: GetEmailTemplatesParams;
  queryKey?: QueryKey;
}

export const useGetEmailTemplates = ({ params, queryKey = [], ...options }: UseGetEmailTemplatesOptions = {}) =>
  useQuery({
    queryKey: ['emailTemplates', params, queryKey],
    queryFn: async () => await fetchEmailTemplates(params),
    ...options
  });
