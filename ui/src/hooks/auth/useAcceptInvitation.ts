import { acceptInvitation } from '@hike/services';
import { AcceptInvitationParams, HikeError, UserExtended } from '@hike/types';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useAcceptInvitation = (
  mutationOptions?: UseMutationOptions<UserExtended, HikeError<null>, AcceptInvitationParams>
) =>
  useMutation({
    mutationKey: ['acceptInvitation'],
    mutationFn: async (params) => await acceptInvitation(params),
    ...mutationOptions
  });
