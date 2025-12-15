import { acceptInvitation, acceptInvitationV2 } from '@hike/services';
import type { AcceptInvitationParams, AcceptInvitationV2Params, HikeError, UserExtended } from '@hike/types';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useAcceptInvitation = (
  options?: UseMutationOptions<UserExtended, HikeError<null>, AcceptInvitationParams>
) =>
  useMutation({
    mutationKey: ['acceptInvitation'],
    mutationFn: async (params) => await acceptInvitation(params),
    ...options
  });

export const useAcceptInvitationV2 = (
  options?: Omit<UseMutationOptions<UserExtended, HikeError<null>, AcceptInvitationV2Params>, 'mutationFn'>
) =>
  useMutation({
    mutationKey: ['acceptInvitationV2'],
    mutationFn: async (params) => await acceptInvitationV2(params),
    ...options
  });
