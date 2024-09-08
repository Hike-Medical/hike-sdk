import { AddCompanyParams, CompanyExtended } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { addDemoCompany } from '../../api/company.service';
import { ResponseError } from '../../errors/ResponseError';

interface AddDemoCompanyContext {
  body: AddCompanyParams;
}

export const useAddDemoCompany = (
  options?: UseMutationOptions<CompanyExtended, ResponseError<null>, AddDemoCompanyContext>
) => {
  return useMutation({
    mutationKey: ['addDemoCompany'],
    mutationFn: async ({ body }: AddDemoCompanyContext) => await addDemoCompany(body),
    ...options
  });
};
