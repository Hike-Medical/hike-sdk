import { HikeError, runSlicerForSide } from '@hike/services';
import { RunAutoSlicerParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface RunCustomSlicerContext {
  body: RunAutoSlicerParams;
  companyIds?: string[];
}

export const useRunSlicerForSide = (options?: UseMutationOptions<void, HikeError<null>, RunCustomSlicerContext>) =>
  useMutation({
    mutationKey: ['submitOrder'],
    mutationFn: async ({ body, companyIds }) => await runSlicerForSide(body, companyIds),
    ...options
  });
