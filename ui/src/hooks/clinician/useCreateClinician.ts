import { HikeError, createClinician } from '@hike/services';
import { Clinician, CreateClinicianParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface CreateClinicianOptions {
  params: CreateClinicianParams;
}

export const useCreateClinician = (options?: UseMutationOptions<Clinician, HikeError<null>, CreateClinicianOptions>) =>
  useMutation({
    mutationKey: ['createClinician'],
    mutationFn: async ({ params }) => await createClinician(params),
    ...options
  });
