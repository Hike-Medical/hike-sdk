import { InviteUserParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { inviteUserEmail } from '../../auth/inviteUserEmail';
import { HikeError } from '../../errors/HikeError';

interface InviteUserContext {
  body: InviteUserParams;
}

export const useInviteUsers = (options?: UseMutationOptions<boolean, HikeError<null>, InviteUserContext>) => {
  return useMutation({
    mutationKey: ['inviteUsers'],
    mutationFn: async ({ body }: InviteUserContext) => await inviteUserEmail(body),
    ...options
  });
};
