import { AgreementType, UserAgreement } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { acceptTerms } from '../../api/terms.service';
import { HikeError } from '../../errors/HikeError';

interface AcceptTermsContext {
  type: AgreementType;
}

export const useAcceptTerms = (options?: UseMutationOptions<UserAgreement, HikeError<null>, AcceptTermsContext>) => {
  return useMutation({
    mutationKey: ['acceptTerms'],
    mutationFn: async ({ type }: AcceptTermsContext) => await acceptTerms({ type }),
    ...options
  });
};
