import { revokeInvitations } from '@hike/services';
import { HikeError, RevokeInvitationsParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useRevokeInvitations = (
  options?: UseMutationOptions<{ count: number }, HikeError<null>, RevokeInvitationsParams>
) =>
  useMutation({
    mutationKey: ['revokeInvitations'],
    mutationFn: async (params) => await revokeInvitations(params),
    ...options
  });
