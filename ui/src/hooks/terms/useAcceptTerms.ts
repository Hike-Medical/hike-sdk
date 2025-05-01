import { HikeError, acceptTerms } from '@hike/services';
import { AgreementStatus, AgreementType, UserAgreement } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface AcceptTermsContext {
  type: AgreementType;
  status?: AgreementStatus;
}

export const useAcceptTerms = (options?: UseMutationOptions<UserAgreement, HikeError<null>, AcceptTermsContext>) =>
  useMutation({
    mutationKey: ['acceptTerms'],
    mutationFn: async ({ type, status }) => await acceptTerms({ type, status }),
    ...options
  });
