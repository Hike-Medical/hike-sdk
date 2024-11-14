import { CreateCampaignParams, Notification } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { createCampaign } from '../../api/notify.service';
import { HikeError } from '../../errors/HikeError';

interface CreateCampaignContext {
  body: CreateCampaignParams;
}

export const useCreateCampaign = (
  options?: UseMutationOptions<Notification, HikeError<null>, CreateCampaignContext>
) => {
  return useMutation({
    mutationKey: ['createCampaign'],
    mutationFn: async ({ body }: CreateCampaignContext) => await createCampaign(body),
    ...options
  });
};
