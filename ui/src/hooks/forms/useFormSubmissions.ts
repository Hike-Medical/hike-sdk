import { findFormSubmissionsByWorkbenchId } from '@hike/services';
import { FormFieldValue, HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseFormSubmissionsOptions
  extends Omit<UseQueryOptions<Record<string, FormFieldValue>, HikeError<null>>, 'queryKey' | 'queryFn'> {
  workbenchId: string;
  queryKey?: QueryKey;
}

export const useFormSubmissions = ({ workbenchId, queryKey = [], ...options }: UseFormSubmissionsOptions) =>
  useQuery({
    queryKey: ['formSubmissions', workbenchId, queryKey],
    queryFn: async () => await findFormSubmissionsByWorkbenchId(workbenchId),
    ...options
  });
