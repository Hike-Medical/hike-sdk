import { adminMergePatients } from '@hike/services';
import { HikeError, PatientConsolidationResponse } from '@hike/types';
import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';

interface AdminMergePatientsVariables {
  patientId: string;
  candidatePatientId: string;
}

interface UseAdminMergePatientsOptions
  extends Omit<
    UseMutationOptions<PatientConsolidationResponse, HikeError<null>, AdminMergePatientsVariables>,
    'mutationFn'
  > {}

export const useAdminMergePatients = (options?: UseAdminMergePatientsOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ patientId, candidatePatientId }: AdminMergePatientsVariables) =>
      await adminMergePatients(patientId, candidatePatientId),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      queryClient.invalidateQueries({ queryKey: ['patientsById', variables.patientId] });
      options?.onSuccess?.(data, variables, context);
    },
    ...options
  });
};
