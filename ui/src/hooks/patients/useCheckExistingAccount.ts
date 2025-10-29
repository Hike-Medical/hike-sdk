import { checkExistingAccount } from '@hike/services';
import { CheckExistingAccountParams, CheckExistingAccountResponse } from '@hike/types';
import { useQuery } from '@tanstack/react-query';

export const useCheckExistingAccount = (params: CheckExistingAccountParams, enabled = true) => {
  return useQuery<CheckExistingAccountResponse>({
    queryKey: ['check-existing-account', params.email, params.phone],
    queryFn: () => checkExistingAccount(params),
    enabled: enabled && !!(params.email || params.phone)
  });
};

