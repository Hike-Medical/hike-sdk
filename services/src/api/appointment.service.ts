import { Appointment, CreateAppointmentParams, DeleteAppointmentParams, GetAppointmentsParams } from '@hike/types';
import { backendApi } from '../utils/backendApi';

export const createAppointment = async (createAppointmentParams: CreateAppointmentParams): Promise<Appointment> => {
  const response = await backendApi.post('appointment', createAppointmentParams);
  return response.data;
};

export const getAppointments = async (getAppointmentsParams: GetAppointmentsParams): Promise<Appointment[]> => {
  const response = await backendApi.get('appointment', { params: getAppointmentsParams });
  return response.data;
};

export const deleteAppointment = async (deleteAppointmentParams: DeleteAppointmentParams): Promise<Appointment> => {
  const { appointmentId } = deleteAppointmentParams;
  const response = await backendApi.delete(`appointment/${appointmentId}`);
  return response.data;
};
