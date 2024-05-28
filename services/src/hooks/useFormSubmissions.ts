import type { FormSubmissionExtended } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { findFormSubmissionsByWorkbenchId } from '../api/form.service';
import { ResponseError } from '../errors/ResponseError';

export interface UseFormSubmissionsOptions
  extends Omit<UseQueryOptions<FormSubmissionExtended[], ResponseError<null>>, 'queryKey' | 'queryFn'> {
  workbenchId: string;
  key?: string[];
}

export const useFormSubmissions = ({ workbenchId, key = [], ...options }: UseFormSubmissionsOptions) =>
  useQuery({
    queryKey: ['formSubmissions', workbenchId, ...key],
    queryFn: async () => await findFormSubmissionsByWorkbenchId(workbenchId),
    ...options
  });
