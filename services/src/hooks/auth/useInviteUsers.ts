import { InviteUserParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { inviteUserEmail } from '../../api/auth.service';
import { HikeError } from '../../errors/HikeError';

interface InviteUserContext {
  body: InviteUserParams;
}

export const useInviteUsers = (options?: UseMutationOptions<boolean, HikeError<null>, InviteUserContext>) =>
  useMutation({
    mutationKey: ['inviteUsers'],
    mutationFn: async ({ body }) => await inviteUserEmail(body),
    ...options
  });
