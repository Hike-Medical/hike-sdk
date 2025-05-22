import { acceptInvitationCompany } from '@hike/services';
import { AcceptInvitationCompanyParams, AcceptInvitationCompanyResponse, HikeError } from '@hike/types';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useAcceptInvitationCompany = (
  mutationOptions?: UseMutationOptions<AcceptInvitationCompanyResponse, HikeError<null>, AcceptInvitationCompanyParams>
) =>
  useMutation({
    mutationKey: ['acceptInvitationCompany'],
    mutationFn: async (params) => await acceptInvitationCompany(params),
    ...mutationOptions
  });
