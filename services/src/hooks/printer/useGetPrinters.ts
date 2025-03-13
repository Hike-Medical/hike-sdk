import { Printer } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getPrinters } from '../../api/printer.service';
import { HikeError } from '../../errors/HikeError';

interface UseGetPrintersOptions extends Omit<UseQueryOptions<Printer[], HikeError<null>>, 'queryFn' | 'queryKey'> {
  companyIds?: string[];
  queryKey?: QueryKey;
}

export const useGetPrinters = ({ queryKey = [], ...options }: UseGetPrintersOptions) =>
  useQuery<Printer[], HikeError<null>>({
    queryKey: ['getPrinters', queryKey],
    queryFn: async () => await getPrinters(),
    ...options
  });
