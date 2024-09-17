import { CreatePinDto } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { createPin } from '../../api/pin.service';
import { HikeError } from '../../errors/HikeError';

export const useCreatePin = (options?: UseMutationOptions<void, HikeError<null>, CreatePinDto>) => {
  return useMutation({
    mutationKey: ['createPin'],
    mutationFn: async (body: CreatePinDto) => await createPin(body),
    ...options
  });
};
