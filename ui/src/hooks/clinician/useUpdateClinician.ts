import { HikeError, updateClinician } from '@hike/services';
import { Clinician, UpdateClinicianParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface UpdateClinicianContext {
  clinicianId: string;
  body: UpdateClinicianParams;
}

export const useUpdateClinician = (
  options?: UseMutationOptions<Clinician, HikeError<null>, UpdateClinicianContext>
) =>
  useMutation({
    mutationKey: ['updateClinician'],
    mutationFn: async ({ clinicianId, body }) => await updateClinician(clinicianId, body),
    ...options
  });
