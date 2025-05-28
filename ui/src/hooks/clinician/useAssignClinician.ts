import { assignClinician } from '@hike/services';
import { AssignClinicianParams, Clinician, HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useAssignClinician = (options?: UseMutationOptions<Clinician, HikeError<null>, AssignClinicianParams>) =>
  useMutation({
    mutationKey: ['assignClinician'],
    mutationFn: async (params) => await assignClinician(params),
    ...options
  });
