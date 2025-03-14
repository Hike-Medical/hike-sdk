import { SendTestParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { sendNotificationTest } from '../../api/notification.service';
import { HikeError } from '../../errors/HikeError';

interface UseSendNotificationTestOptions {
  messageId: string;
  params: SendTestParams;
}

export const useSendNotificationTest = (
  options?: UseMutationOptions<void, HikeError<null>, UseSendNotificationTestOptions>
) =>
  useMutation({
    mutationKey: ['sendNotificationTest'],
    mutationFn: async ({ messageId, params }) => await sendNotificationTest(messageId, params),
    ...options
  });
