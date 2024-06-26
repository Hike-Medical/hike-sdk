import type { FormSubmissionTyped } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { findFormSubmission } from '../../api/form.service';
import { ResponseError } from '../../errors/ResponseError';

export interface UseFormSubmissionOptions
  extends Omit<UseQueryOptions<FormSubmissionTyped | null, ResponseError<null>>, 'queryKey' | 'queryFn'> {
  schemaId: string;
  workbenchId: string;
  queryKey?: QueryKey;
}

export const useFormSubmission = ({ schemaId, workbenchId, queryKey = [], ...options }: UseFormSubmissionOptions) => {
  const key = ['formSubmission', schemaId, workbenchId, queryKey];

  const query = useQuery({
    queryKey: key,
    queryFn: async () => await findFormSubmission(schemaId, workbenchId),
    ...options
  });

  return {
    queryKey: key,
    ...query
  };
};
