import type {
  AcknowledgeManualReprintParams,
  ConfirmOrderMovedParams,
  CreateQCRejectionParams,
  CreateQCRejectionReasonParams,
  GetQCRejectionCountsParams,
  GetQCRejectionReasonsParams,
  GetQCRejectionsParams,
  MarkKTCompleteParams,
  PrintJobWithDetails,
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

export const getRejectionPrintjobs = async (rejectionId: string): Promise<PrintJobWithDetails[]> => {
  try {
    const response = await backendApi.get(`soleforge/qc-rejection/${rejectionId}/printjobs`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const confirmOrderMoved = async (params: ConfirmOrderMovedParams): Promise<QCRejection> => {
  try {
    const { rejectionId, jwtToken, ...body } = params;
    const response = await backendApi.post(`soleforge/qc-rejection/${rejectionId}/confirm-order-moved`, body, {
      headers: addHeaders(undefined, { Authorization: jwtToken ? `Bearer ${jwtToken}` : undefined })
    });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const acknowledgeManualReprint = async (params: AcknowledgeManualReprintParams): Promise<QCRejection> => {
  try {
    const { rejectionId, jwtToken, ...body } = params;
    const response = await backendApi.post(`soleforge/qc-rejection/${rejectionId}/acknowledge-manual-reprint`, body, {
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

export const acknowledgeManualReprint = async (params: AcknowledgeManualReprintParams): Promise<QCRejection> => {
  try {
    const { rejectionId, jwtToken, ...body } = params;
    const response = await backendApi.post(`soleforge/qc-rejection/${rejectionId}/acknowledge-manual-reprint`, body, {
      headers: addHeaders(undefined, { Authorization: jwtToken ? `Bearer ${jwtToken}` : undefined })
    });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
