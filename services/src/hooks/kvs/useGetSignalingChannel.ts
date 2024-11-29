import { GetSignalingChannelParams, SignalingChannelResponse } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { getSignalingChannel } from '../../api/kvs.service';
import { HikeError } from '../../errors/HikeError';

interface GetSignalingChannelContext {
  workbenchId: string;
  params: GetSignalingChannelParams;
}

export const useGetSignalingChannel = (
  mutationOptions?: Omit<
    UseMutationOptions<SignalingChannelResponse, HikeError<null>, GetSignalingChannelContext>,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation({
    mutationKey: ['getSignalingChannel'],
    mutationFn: async ({ workbenchId, params }: GetSignalingChannelContext) =>
      await getSignalingChannel(workbenchId, params),
    ...mutationOptions
  });
};
