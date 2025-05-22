import { signUpClinician } from '@hike/services';
import { AuthSession, HikeError, SignUpClinicianParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useSignUpClinician = (options?: UseMutationOptions<AuthSession, HikeError<null>, SignUpClinicianParams>) =>
  useMutation({
    mutationKey: ['signUpClinician'],
    mutationFn: async (params) => await signUpClinician(params),
    ...options
  });
