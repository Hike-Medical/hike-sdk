import { consolidatePatient } from '@hike/services';
import { HikeError, PatientConsolidationResponse } from '@hike/types';
import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';

interface ConsolidatePatientVariables {
  patientId: string;
  candidatePatientId: string;
}

interface UseConsolidatePatientOptions
  extends Omit<
    UseMutationOptions<PatientConsolidationResponse, HikeError<null>, ConsolidatePatientVariables>,
    'mutationFn'
  > {}

export const useConsolidatePatient = (options?: UseConsolidatePatientOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ patientId, candidatePatientId }: ConsolidatePatientVariables) =>
      await consolidatePatient(patientId, candidatePatientId),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['patientsById', variables.patientId] });
      queryClient.invalidateQueries({ queryKey: ['patient-duplicates'] });
      options?.onSuccess?.(data, variables, context);
    },
    ...options
  });
};

