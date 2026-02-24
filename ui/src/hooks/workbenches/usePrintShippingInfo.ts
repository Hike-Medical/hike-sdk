import { printShippingInfo } from '@hike/services';
import { HikeError, PrintShippingParams, PrintShippingResult } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface PrintShippingInfoContext {
  workbenchId: string;
  params: PrintShippingParams;
}

export const usePrintShippingInfo = (
  options?: UseMutationOptions<PrintShippingResult, HikeError<null>, PrintShippingInfoContext>
) =>
  useMutation({
    mutationKey: ['printShippingInfo'],
    mutationFn: async ({ workbenchId, params }) => await printShippingInfo(workbenchId, params),
    ...options
  });
