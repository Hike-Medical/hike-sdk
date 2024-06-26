import type { FormSubmissionTyped } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { findFormSubmissionsByWorkbenchId } from '../../api/form.service';
import { ResponseError } from '../../errors/ResponseError';

export interface UseFormSubmissionsOptions
  extends Omit<UseQueryOptions<FormSubmissionTyped[], ResponseError<null>>, 'queryKey' | 'queryFn'> {
  workbenchId: string;
  queryKey?: QueryKey;
}

export const useFormSubmissions = ({ workbenchId, queryKey = [], ...options }: UseFormSubmissionsOptions) =>
  useQuery({
    queryKey: ['formSubmissions', workbenchId, queryKey],
    queryFn: async () => await findFormSubmissionsByWorkbenchId(workbenchId),
    ...options
  });
