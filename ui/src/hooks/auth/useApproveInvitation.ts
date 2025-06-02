import { approveInvitation } from '@hike/services';
import { ApprovePatientParams, HikeError } from '@hike/types';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

interface UseApproveInvitationParams {
  patientId: string;
  params?: ApprovePatientParams;
}

export const useApproveInvitation = (
  options?: UseMutationOptions<boolean, HikeError<null>, UseApproveInvitationParams>
) =>
  useMutation({
    mutationKey: ['approveInvitation'],
    mutationFn: async (data) => await approveInvitation(data.patientId, data.params),
    ...options
  });
