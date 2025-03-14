import { EmailTemplate } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { fetchEmailTemplates } from '../../api/email-template.service';
import { HikeError } from '../../errors/HikeError';

interface UseGetEmailTemplatesOptions
  extends Omit<UseQueryOptions<EmailTemplate[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
}

export const useGetEmailTemplates = ({ queryKey = [], ...options }: UseGetEmailTemplatesOptions = {}) =>
  useQuery({
    queryKey: ['emailTemplates', queryKey],
    queryFn: async () => await fetchEmailTemplates(),
    ...options
  });
