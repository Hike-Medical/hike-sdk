import { CreateNotificationParams, Notification } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { createNotification } from '../../api/notify.service';
import { HikeError } from '../../errors/HikeError';

interface CreateCampaignContext {
  body: CreateNotificationParams;
}

export const useCreateCampaign = (
  options?: UseMutationOptions<Notification, HikeError<null>, CreateCampaignContext>
) => {
  return useMutation({
    mutationKey: ['createCampaign'],
    mutationFn: async ({ body }: CreateCampaignContext) => await createNotification(body),
    ...options
  });
};
