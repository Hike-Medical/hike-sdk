import { updatePatient } from '@hike/services';
import { HikeError, PatientExtended, UpdatePatientParams } from '@hike/types';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

interface UpdatePatientById {
  patientId: string;
  body: UpdatePatientParams;
}

export const useUpdatePatientById = (
  options?: UseMutationOptions<PatientExtended, HikeError<null>, UpdatePatientById>
) =>
  useMutation({
    mutationKey: ['updatePatient'],
    mutationFn: async ({ patientId, body }) => await updatePatient(patientId, body),
    ...options
  });
