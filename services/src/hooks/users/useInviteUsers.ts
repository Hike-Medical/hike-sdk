import { InviteUserParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { inviteUser } from '../../api/user.service';
import { ResponseError } from '../../errors/ResponseError';

interface InviteUserContext {
  body: InviteUserParams;
}

export const useInviteUsers = (options?: UseMutationOptions<boolean, ResponseError<null>, InviteUserContext>) => {
  return useMutation({
    mutationKey: ['inviteUsers'],
    mutationFn: async ({ body }: InviteUserContext) => await inviteUser(body),
    ...options
  });
};
