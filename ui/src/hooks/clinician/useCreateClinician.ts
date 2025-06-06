import { createClinician } from '@hike/services';
import { Clinician, CreateClinicianParams, HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useCreateClinician = (options?: UseMutationOptions<Clinician, HikeError<null>, CreateClinicianParams>) =>
  useMutation({
    mutationKey: ['createClinician'],
    mutationFn: async (params) => await createClinician(params),
    ...options
  });
