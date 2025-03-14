import { PrintShippingParams, ShippingLabel } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { printShippingInfo } from '../../api/workbench.service';
import { HikeError } from '../../errors/HikeError';

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
