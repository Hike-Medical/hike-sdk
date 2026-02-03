import { getLabelPrinters } from '@hike/services';
import { GetLabelPrintersParams, HikeError, LabelPrinter } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseLabelPrintersOptions
  extends Omit<UseQueryOptions<LabelPrinter[], HikeError<null>>, 'queryFn' | 'queryKey'> {
  params?: GetLabelPrintersParams;
  queryKey?: QueryKey;
}

export const useLabelPrinters = ({ params, queryKey = [], ...options }: UseLabelPrintersOptions = {}) =>
  useQuery<LabelPrinter[], HikeError<null>>({
    queryKey: ['label-printers', params, queryKey],
    queryFn: async () => await getLabelPrinters(params),
    ...options
  });
