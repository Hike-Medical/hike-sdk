import { CheckoutProduct, HikeError, WorkbenchGenerateInvoiceParams } from '@hike/sdk';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { generateInvoice } from '../api/billing.service';

interface UseGenerateInvoiceOptions
  extends Omit<UseQueryOptions<CheckoutProduct[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  workbenchId: string;
  data: WorkbenchGenerateInvoiceParams;
  queryKey?: QueryKey;
}

export const useGenerateInvoice = ({ queryKey = [], workbenchId, data, ...options }: UseGenerateInvoiceOptions) =>
  useQuery({
    queryKey: ['generateInvoice', queryKey],
    queryFn: async () => await generateInvoice(workbenchId, data),
    ...options
  });
