import type { FormSubmissionExtended } from '@hike/types';
import { useQuery } from '@tanstack/react-query';
import { findFormSubmissionsByWorkbenchId } from '../api/form.service';
import { ResponseError } from '../errors/ResponseError';

export interface UseFormSubmissionsOptions {
  key?: string[];
  workbenchId: string;
  enabled?: boolean;
}

export const useFormSubmissions = ({ key = [], workbenchId, enabled = true }: UseFormSubmissionsOptions) =>
  useQuery<FormSubmissionExtended[], ResponseError<null>>({
    queryKey: ['formSubmissions', workbenchId, ...key],
    queryFn: async () => await findFormSubmissionsByWorkbenchId(workbenchId),
    enabled
  });
