import { HikeError, findEmailTemplateById } from '@hike/services';
import { EmailTemplate } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseGetEmailTemplateOption
  extends Omit<UseQueryOptions<EmailTemplate, HikeError<null>>, 'queryKey' | 'queryFn'> {
  templateId: string;
  queryKey?: QueryKey;
}

export const useGetEmailTemplate = ({ templateId, queryKey = [], ...options }: UseGetEmailTemplateOption) =>
  useQuery({
    queryKey: ['emailTemplate', templateId, queryKey],
    queryFn: async () => await findEmailTemplateById(templateId),
    ...options
  });
