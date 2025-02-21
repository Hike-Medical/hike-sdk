import { SendGcodeToPrinterParams } from '@hike/types';
import { addHeaders } from '@hike/utils';
import { toHikeError } from '../errors/HikeError';
import { backendApi } from '../utils/backendApi';

export const printGcode = async (body: SendGcodeToPrinterParams, companyIds: string[]) => {
  try {
    const response = await backendApi.post(`printer/send-gcode`, body, { headers: addHeaders(companyIds) });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const sendPrinterLabel = async (workbenchId: string, companyIds: string[]) => {
  try {
    const response = await backendApi.post(`printer/${workbenchId}/label`, { headers: addHeaders(companyIds) });
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
