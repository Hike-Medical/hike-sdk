import { findFormSubmissions } from '@hike/services';
import { FormSubmissionTyped, HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseFormSubmissionsOptions
  extends Omit<UseQueryOptions<FormSubmissionTyped[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  workbenchId: string;
  queryKey?: QueryKey;
}

export const useFormSubmissions = ({ workbenchId, queryKey = [], ...options }: UseFormSubmissionsOptions) =>
  useQuery({
    queryKey: ['formSubmissions', workbenchId, queryKey],
    queryFn: async () => await findFormSubmissions(workbenchId),
    ...options
  });
