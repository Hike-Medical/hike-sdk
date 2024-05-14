import React from 'react';
import { PatientCard, PatientCardProps } from './PatientCard';

export default {
  component: PatientCard,
  title: 'PatientCard',
  argTypes: {
    firstName: { control: 'text' },
    middleName: { control: 'text' },
    lastName: { control: 'text' },
    birthDate: { control: 'date' },
    lastVisit: { control: 'date' },
    isDiabetic: { control: 'boolean' },
    isVeteranAdministration: { control: 'boolean' },
    patientId: { control: 'text' }
  },
  args: {
    firstName: 'Derrick',
    lastName: 'Rose',
    isDiabetic: false,
    patientId: '100001',
    isVeteranAdministration: false,
    birthDate: new Date('1997-12-12T00:00:00'),
    lastVisit: new Date('2024-05-12T00:00:00')
  } as PatientCardProps
};
export const Default = (args: PatientCardProps) => React.createElement(PatientCard, args);
