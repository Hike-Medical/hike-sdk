import { Workbench } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { validateConsumerSubmission } from '../../api/workbench.service';
import { HikeError } from '../../errors/HikeError';

interface ValidateConsumerSubmissionContext {
  workbenchId: string;
}

export const useValidateConsumerSubmission = (
  options?: UseMutationOptions<Workbench, HikeError<null>, ValidateConsumerSubmissionContext>
) => {
  return useMutation({
    mutationKey: ['validateConsumerSubmission'],
    mutationFn: async ({ workbenchId }: ValidateConsumerSubmissionContext) =>
      await validateConsumerSubmission(workbenchId),
    ...options
  });
};