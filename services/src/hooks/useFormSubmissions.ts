import type { FormSubmissionExtended } from '@hike/types';
import { useQuery } from '@tanstack/react-query';
import { findFormSubmissionsByEvaluationId } from '../api/form.service';
import { ResponseError } from '../errors/ResponseError';

export interface UseFormSubmissionsOptions {
  key?: string[];
  evaluationId: string;
  enabled?: boolean;
}

export const useFormSubmissions = ({ key = [], evaluationId, enabled = true }: UseFormSubmissionsOptions) =>
  useQuery<FormSubmissionExtended[], ResponseError<null>>({
    queryKey: ['formSubmissions', ...key, evaluationId],
    queryFn: async () => await findFormSubmissionsByEvaluationId(evaluationId),
    enabled
  });
