import { checkIfManualPrintRequired } from '@hike/services';
import type { HikeError } from '@hike/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useCheckIfManualPrintRequired = (
  orderId: string | undefined,
  options?: Omit<UseQueryOptions<{ isManualPrint: boolean }, HikeError<null>>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['checkIfManualPrintRequired', orderId],
    queryFn: async () => {
      if (!orderId) throw new Error('Order ID required');
      return await checkIfManualPrintRequired(orderId);
    },
    enabled: !!orderId,
    ...options
  });
