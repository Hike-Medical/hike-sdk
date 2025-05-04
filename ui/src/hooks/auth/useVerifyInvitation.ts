import { HikeError, verifyInvitation } from '@hike/services';
import { VerifyInvitationResponse } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useVerifyInvitation = (
  mutationOptions?: UseMutationOptions<VerifyInvitationResponse, HikeError<null>, string>
) =>
  useMutation({
    mutationKey: ['verifyInvitation'],
    mutationFn: async (token) => await verifyInvitation(token),
    ...mutationOptions
  });
