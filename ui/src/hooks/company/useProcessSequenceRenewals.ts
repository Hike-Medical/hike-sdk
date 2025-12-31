import { processSequenceRenewals } from '@hike/services';
import { HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useProcessSequenceRenewals = (
  options?: UseMutationOptions<{ updated: number }, HikeError<null>>
) =>
  useMutation({
    mutationKey: ['processSequenceRenewals'],
    mutationFn: async () => await processSequenceRenewals(),
    ...options
  });

