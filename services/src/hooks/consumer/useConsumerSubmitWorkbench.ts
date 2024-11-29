import { Workbench } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { consumerSubmitWorkbench } from '../../api/consumer.service';
import { HikeError } from '../../errors/HikeError';

interface ConsumerSubmitWorkbenchContext {
  workbenchId: string;
}

export const useConsumerSubmitWorkbench = (
  options?: UseMutationOptions<Workbench, HikeError<null>, ConsumerSubmitWorkbenchContext>
) => {
  return useMutation({
    mutationKey: ['consumerSubmitOrder'],
    mutationFn: async ({ workbenchId }: ConsumerSubmitWorkbenchContext) => await consumerSubmitWorkbench(workbenchId),
    ...options
  });
};
