import { verifyInvitation } from '@hike/services';
import { HikeError, VerifyInvitationResponse } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useVerifyInvitation = (options?: UseMutationOptions<VerifyInvitationResponse, HikeError<null>, string>) =>
  useMutation({
    mutationKey: ['verifyInvitation'],
    mutationFn: async (token) => await verifyInvitation(token),
    ...options
  });
