import { HikeError, printShippingInfo } from '@hike/services';
import { PrintShippingParams, ShippingLabel } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface PrintShippingInfoContext {
  workbenchId: string;
  params: PrintShippingParams;
}

export const usePrintShippingInfo = (
  options?: UseMutationOptions<ShippingLabel | null, HikeError<null>, PrintShippingInfoContext>
) =>
  useMutation({
    mutationKey: ['printShippingInfo'],
    mutationFn: async ({ workbenchId, params }) => await printShippingInfo(workbenchId, params),
    ...options
  });
