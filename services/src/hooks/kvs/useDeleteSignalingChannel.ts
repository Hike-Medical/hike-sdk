import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { deleteSignalingChannel } from '../../api/kvs.service';
import { HikeError } from '../../errors/HikeError';

export const useDeleteSignalingChannel = (
  mutationOptions?: Omit<UseMutationOptions<void, HikeError<null>, string>, 'mutationKey' | 'mutationFn'>
) =>
  useMutation({
    mutationFn: (channelName) => deleteSignalingChannel(channelName),
    ...mutationOptions
  });
