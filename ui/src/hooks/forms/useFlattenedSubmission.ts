import { findFlattenedFormSubmission } from '@hike/services';
import { FormSubmissionTyped, HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseFlattenedSubmissionOptions
  extends Omit<UseQueryOptions<FormSubmissionTyped['data'], HikeError<null>>, 'queryKey' | 'queryFn'> {
  workbenchId: string;
  queryKey?: QueryKey;
}

export const useFlattenedSubmission = ({ workbenchId, queryKey = [], ...options }: UseFlattenedSubmissionOptions) =>
  useQuery({
    queryKey: ['flattenedSubmission', workbenchId, queryKey],
    queryFn: async () => await findFlattenedFormSubmission(workbenchId),
    ...options
  });
