import { CreatePinDto } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { createPin } from '../../api/pin.service';

export const useCreatePin = (options?: UseMutationOptions<void, Error, CreatePinDto>) => {
  return useMutation({
    mutationKey: ['createPin'],
    mutationFn: async (body: CreatePinDto) => await createPin(body),
    ...options
  });
};
