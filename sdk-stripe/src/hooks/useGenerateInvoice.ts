import { CheckoutProduct, HikeError, WorkbenchGenerateInvoiceParams } from '@hike/sdk';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { generateInvoice } from '../api/billing.service';

interface UseGenerateInvoiceOptions
  extends Omit<UseQueryOptions<CheckoutProduct[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  workbenchId: string;
  params: WorkbenchGenerateInvoiceParams;
  queryKey?: QueryKey;
}

export const useGenerateInvoice = ({ queryKey = [], workbenchId, params, ...options }: UseGenerateInvoiceOptions) =>
  useQuery({
    queryKey: ['generateInvoice', queryKey, workbenchId, params],
    queryFn: async () => await generateInvoice(workbenchId, params),
    ...options
  });
