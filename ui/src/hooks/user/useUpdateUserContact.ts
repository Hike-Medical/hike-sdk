import { updateUserContact } from '@hike/services';
import type { HikeError, SafeUser, UpdateContactParams } from '@hike/types';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useUpdateUserContact = (
  options?: Omit<UseMutationOptions<SafeUser, HikeError<null>, UpdateContactParams>, 'mutationFn'>
) =>
  useMutation({
    mutationKey: ['updateUserContact'],
    mutationFn: async (params) => await updateUserContact(params),
    ...options
  });
