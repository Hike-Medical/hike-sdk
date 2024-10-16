import { EmailTemplate } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getEmailTemplates } from '../../api/notify.service';
import { HikeError } from '../../errors/HikeError';

export interface useGetEmailTemplatesOptions
  extends Omit<UseQueryOptions<EmailTemplate[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
}

export const useGetEmailTemplates = ({ queryKey = [], ...options }: useGetEmailTemplatesOptions = {}) =>
  useQuery({
    queryKey: ['emailTemplates', queryKey],
    queryFn: async () => await getEmailTemplates(),
    ...options
  });
