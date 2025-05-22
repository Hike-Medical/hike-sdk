import { validateConsumerSubmission } from '@hike/services';
import { HikeError, Workbench } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface ValidateConsumerSubmissionContext {
  workbenchId: string;
}

export const useValidateConsumerSubmission = (
  options?: UseMutationOptions<Workbench, HikeError<null>, ValidateConsumerSubmissionContext>
) =>
  useMutation({
    mutationKey: ['validateConsumerSubmission'],
    mutationFn: async ({ workbenchId }) => await validateConsumerSubmission(workbenchId),
    ...options
  });
