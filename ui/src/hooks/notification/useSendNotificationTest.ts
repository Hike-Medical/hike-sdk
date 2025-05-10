import { HikeError, sendNotificationTest } from '@hike/services';
import { SendTestParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

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
