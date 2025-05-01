import { HikeError, getSignalingChannel } from '@hike/services';
import { GetSignalingChannelParams, SignalingChannelResponse } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface GetSignalingChannelContext {
  workbenchId: string;
  params: GetSignalingChannelParams;
}

export const useGetSignalingChannel = (
  mutationOptions?: Omit<
    UseMutationOptions<SignalingChannelResponse, HikeError<null>, GetSignalingChannelContext>,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: ['getSignalingChannel'],
    mutationFn: async ({ workbenchId, params }) => await getSignalingChannel(workbenchId, params),
    ...mutationOptions
  });
