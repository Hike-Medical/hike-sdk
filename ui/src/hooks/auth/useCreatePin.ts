import { createPin } from '@hike/services';
import { CreatePinDto, HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useCreatePin = (options?: UseMutationOptions<void, HikeError<null>, CreatePinDto>) =>
  useMutation({
    mutationKey: ['createPin'],
    mutationFn: async (body) => await createPin(body),
    ...options
  });
