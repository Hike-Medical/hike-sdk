import { HikeError, fetchEmailTemplates } from '@hike/services';
import { EmailTemplateExtended } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseGetEmailTemplatesOptions
  extends Omit<UseQueryOptions<EmailTemplateExtended[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
}

export const useGetEmailTemplates = ({ queryKey = [], ...options }: UseGetEmailTemplatesOptions = {}) =>
  useQuery({
    queryKey: ['emailTemplates', queryKey],
    queryFn: async () => await fetchEmailTemplates(),
    ...options
  });
