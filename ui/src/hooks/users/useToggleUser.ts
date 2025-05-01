import { HikeError, activateUser, deactivateUser } from '@hike/services';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface UseToggleUserOptions {
  userId: string;
  active: boolean;
}

export const useToggleUser = (options?: UseMutationOptions<void, HikeError<null>, UseToggleUserOptions>) =>
  useMutation({
    mutationKey: ['toggleUser'],
    mutationFn: async ({ userId, active }) => (active ? await activateUser(userId) : await deactivateUser(userId)),
    ...options
  });
