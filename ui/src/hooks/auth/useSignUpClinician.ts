import { HikeError, signUpClinician } from '@hike/services';
import { AuthSession, SignUpClinicianParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useSignUpClinician = (
  mutationOptions?: UseMutationOptions<AuthSession, HikeError<null>, SignUpClinicianParams>
) =>
  useMutation({
    mutationKey: ['signUpClinician'],
    mutationFn: async (params) => await signUpClinician(params),
    ...mutationOptions
  });
