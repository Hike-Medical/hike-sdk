import {
  CreateDepartmentParams,
  Department,
  DepartmentExtended,
  GetDepartmentsParams,
  UpdateDepartmentParams
} from '@hike/types';
import { addHeaders } from '@hike/utils';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const fetchDepartments = async (
  params?: GetDepartmentsParams,
  companyIds?: string[]
): Promise<DepartmentExtended[]> => {
  try {
    const response = await backendApi.get('department', { params, headers: addHeaders(companyIds) });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchDepartment = async (departmentId: string): Promise<Department> => {
  try {
    const response = await backendApi.get(`department/${departmentId}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const createDepartment = async (params: CreateDepartmentParams): Promise<Department> => {
  try {
    const response = await backendApi.post('department', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const updateDepartment = async (departmentId: string, params: UpdateDepartmentParams): Promise<Department> => {
  try {
    const response = await backendApi.patch(`department/${departmentId}`, params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const deleteDepartment = async (departmentId: string): Promise<void> => {
  try {
    await backendApi.delete(`department/${departmentId}`);
  } catch (error) {
    throw toHikeError(error);
  }
};

export const activateDepartment = async (departmentId: string): Promise<void> => {
  try {
    await backendApi.post(`department/${departmentId}/activate`);
  } catch (error) {
    throw toHikeError(error);
  }
};

export const deactivateDepartment = async (departmentId: string): Promise<void> => {
  try {
    await backendApi.post(`department/${departmentId}/deactivate`);
  } catch (error) {
    throw toHikeError(error);
  }
};
