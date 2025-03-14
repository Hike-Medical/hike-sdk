import { CreatePinDto } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { createPin } from '../../api/pin.service';
import { HikeError } from '../../errors/HikeError';

export const useCreatePin = (options?: UseMutationOptions<void, HikeError<null>, CreatePinDto>) =>
  useMutation({
    mutationKey: ['createPin'],
    mutationFn: async (body) => await createPin(body),
    ...options
  });
