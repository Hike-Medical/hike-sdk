import type {
  CreateQCRejectionParams,
  CreateQCRejectionReasonParams,
  GetQCRejectionCountsParams,
  GetQCRejectionReasonsParams,
  GetQCRejectionsParams,
  MarkKTCompleteParams,
  QCRejection,
  QCRejectionCountsResponse,
  QCRejectionReasonWithStations,
  QCRejectionWithRelations,
  ReviewQCRejectionParams,
  SendReprintJobParams,
  UpdateQCRejectionReasonParams
} from '@hike/types';
import { addHeaders } from '@hike/utils';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const createQCRejection = async (params: CreateQCRejectionParams): Promise<QCRejection> => {
  try {
    const response = await backendApi.post('soleforge/qc-rejection', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getQCRejections = async (params?: GetQCRejectionsParams): Promise<QCRejectionWithRelations[]> => {
  try {
    const response = await backendApi.get('soleforge/qc-rejection', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getQCRejectionCounts = async (params?: GetQCRejectionCountsParams): Promise<QCRejectionCountsResponse> => {
  try {
    const response = await backendApi.get('soleforge/qc-rejection/counts', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const reviewQCRejection = async (params: ReviewQCRejectionParams): Promise<QCRejection> => {
  try {
    const { rejectionId, jwtToken, ...body } = params;
    const response = await backendApi.patch(`soleforge/qc-rejection/${rejectionId}/review`, body, {
      headers: addHeaders(undefined, { Authorization: jwtToken ? `Bearer ${jwtToken}` : undefined })
    });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const sendQCRejectionReprintJob = async (params: SendReprintJobParams): Promise<QCRejection> => {
  try {
    const { rejectionId, jwtToken, ...body } = params;
    const response = await backendApi.post(`soleforge/qc-rejection/${rejectionId}/send-reprint-job`, body, {
      headers: addHeaders(undefined, { Authorization: jwtToken ? `Bearer ${jwtToken}` : undefined })
    });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const markKTComplete = async (
  params: MarkKTCompleteParams & { rejectionId: string; jwtToken?: string }
): Promise<QCRejection> => {
  try {
    const { rejectionId, jwtToken, ...body } = params;
    const response = await backendApi.patch(`soleforge/qc-rejection/${rejectionId}/mark-kt-complete`, body, {
      headers: addHeaders(undefined, { Authorization: jwtToken ? `Bearer ${jwtToken}` : undefined })
    });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getQCRejectionReasons = async (
  params?: GetQCRejectionReasonsParams
): Promise<QCRejectionReasonWithStations[]> => {
  try {
    const response = await backendApi.get('soleforge/qc-rejection/reasons', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const createQCRejectionReason = async (
  params: CreateQCRejectionReasonParams
): Promise<QCRejectionReasonWithStations> => {
  try {
    const response = await backendApi.post('soleforge/qc-rejection/reasons', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const updateQCRejectionReason = async (
  params: UpdateQCRejectionReasonParams
): Promise<QCRejectionReasonWithStations> => {
  try {
    const { reasonId, ...body } = params;
    const response = await backendApi.patch(`soleforge/qc-rejection/reasons/${reasonId}`, body);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
