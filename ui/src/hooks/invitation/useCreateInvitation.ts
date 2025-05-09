import { HikeError, createInvitation } from '@hike/services';
import { AccountVerification, CreateInvitationParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useCreateInvitation = (
  options?: UseMutationOptions<Omit<AccountVerification, 'token'>, HikeError<null>, CreateInvitationParams>
) =>
  useMutation({
    mutationKey: ['createInvitation'],
    mutationFn: async (params) => await createInvitation(params),
    ...options
  });
