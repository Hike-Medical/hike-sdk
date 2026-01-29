import { advanceManualReprintOrderToGrinding } from '@hike/services';
import {
  AdvanceManualReprintOrderToGrindingParams,
  AdvanceManualReprintOrderToGrindingResponse,
  HikeError
} from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useAdvanceManualReprintOrderToGrinding = (
  options?: UseMutationOptions<
    AdvanceManualReprintOrderToGrindingResponse,
    HikeError<null>,
    AdvanceManualReprintOrderToGrindingParams
  >
) =>
  useMutation({
    mutationKey: ['advanceManualReprintOrderToGrinding'],
    mutationFn: async (params) => await advanceManualReprintOrderToGrinding(params),
    ...options
  });
