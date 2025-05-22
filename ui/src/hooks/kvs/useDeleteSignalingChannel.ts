import { deleteSignalingChannel } from '@hike/services';
import { HikeError } from '@hike/types';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useDeleteSignalingChannel = (
  mutationOptions?: Omit<UseMutationOptions<void, HikeError<null>, string>, 'mutationKey' | 'mutationFn'>
) =>
  useMutation({
    mutationFn: (channelName) => deleteSignalingChannel(channelName),
    ...mutationOptions
  });
