import type { AddFeatureFlagParams, CompanyFeatureFlag, ToggleFeatureFlagParams } from '@hike/types';
import { FeatureFlag, FeatureFlagResponse } from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const getFeatureFlagEnabled = async (key: string): Promise<FeatureFlagResponse> => {
  try {
    const response = await backendApi.get(`feature-flag/${key}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getCompanyFeatureFlags = async (): Promise<CompanyFeatureFlag[]> => {
  try {
    const response = await backendApi.get(`feature-flag/company`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getAllFeatureFlags = async (): Promise<FeatureFlag[]> => {
  try {
    const response = await backendApi.get(`feature-flag/all`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getAllCompanyFeatureFlags = async (): Promise<CompanyFeatureFlag[]> => {
  try {
    const response = await backendApi.get(`feature-flag/all/company`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const toggleFeatureFlag = async (params: ToggleFeatureFlagParams): Promise<CompanyFeatureFlag> => {
  try {
    const response = await backendApi.patch('feature-flag/toggle', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const addFeatureFlag = async (params: AddFeatureFlagParams): Promise<FeatureFlag> => {
  try {
    const response = await backendApi.post('feature-flag/add', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
