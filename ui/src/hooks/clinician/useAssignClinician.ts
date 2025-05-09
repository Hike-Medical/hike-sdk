import { HikeError, assignClinician } from '@hike/services';
import { AssignClinicianParams, Clinician } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface AssignClinicianOptions {
  params: AssignClinicianParams;
}

export const useAssignClinician = (options?: UseMutationOptions<Clinician, HikeError<null>, AssignClinicianOptions>) =>
  useMutation({
    mutationKey: ['assignClinician'],
    mutationFn: async ({ params }) => await assignClinician(params),
    ...options
  });
