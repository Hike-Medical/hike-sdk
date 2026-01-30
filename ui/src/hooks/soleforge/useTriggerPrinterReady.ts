import { triggerPrinterReady } from '@hike/services';
import { HikeError, TriggerPrinterReadyParams, TriggerPrinterReadyResponse } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useTriggerPrinterReady = (
  options?: UseMutationOptions<TriggerPrinterReadyResponse, HikeError<null>, TriggerPrinterReadyParams>
) =>
  useMutation({
    mutationKey: ['triggerPrinterReady'],
    mutationFn: async (params) => await triggerPrinterReady(params),
    ...options
  });
