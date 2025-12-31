import { processSequenceRenewals } from '@hike/services';
import { HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface ProcessSequenceRenewalsContext {
  companyIds: string[];
}

export const useProcessSequenceRenewals = (
  options?: UseMutationOptions<{ updated: number }, HikeError<null>, ProcessSequenceRenewalsContext>
) =>
  useMutation({
    mutationKey: ['processSequenceRenewals'],
    mutationFn: async ({ companyIds }) => await processSequenceRenewals(companyIds),
    ...options
  });
