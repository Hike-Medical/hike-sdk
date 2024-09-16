import { SendGcodeToPrinterParams } from '@hike/types';
import { toHikeError } from '../errors/HikeError';
import { backendApi } from '../utils/backendApi';

export const printGcode = async (body: SendGcodeToPrinterParams, companyIds: string[]) => {
  try {
    const response = await backendApi.post(`printer/send-gcode`, body, {
      headers: companyIds?.length ? { 'x-company-id': companyIds.join(',') } : undefined
    });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getPrinters = async () => {
  try {
    const response = await backendApi.get(`printer`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
