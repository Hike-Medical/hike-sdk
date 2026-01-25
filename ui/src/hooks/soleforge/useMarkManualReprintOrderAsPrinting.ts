import { markManualReprintOrderAsPrinting } from '@hike/services';
import {
  HikeError,
  MarkManualReprintOrderAsPrintingParams,
  MarkManualReprintOrderAsPrintingResponse
} from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useMarkManualReprintOrderAsPrinting = (
  options?: UseMutationOptions<
    MarkManualReprintOrderAsPrintingResponse,
    HikeError<null>,
    MarkManualReprintOrderAsPrintingParams
  >
) =>
  useMutation({
    mutationKey: ['markManualReprintOrderAsPrinting'],
    mutationFn: async (params) => await markManualReprintOrderAsPrinting(params),
    ...options
  });
