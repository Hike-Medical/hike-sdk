import { HikeError, addCompany } from '@hike/services';
import { AddCompanyParams, CompanyExtended } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface AddCompanyOptions {
  body: AddCompanyParams;
}

export const useAddCompany = (options?: UseMutationOptions<CompanyExtended, HikeError<null>, AddCompanyOptions>) =>
  useMutation({
    mutationKey: ['addCompany'],
    mutationFn: async ({ body }) => await addCompany(body),
    ...options
  });
