import React from 'react';
import { EvaluationCard, EvaluationCardProps } from './EvaluationCard';

export default {
  component: EvaluationCard,
  title: 'EvaluationCard',
  argTypes: {
    firstName: { control: 'text' },
    middleName: { control: 'text' },
    lastName: { control: 'text' },
    birthDate: { control: 'date' },
    poNumber: { control: 'text' },
    patientId: { control: 'text' },
    clinician: { control: 'text' },
    importedAt: { control: 'date' },
    startedAt: { control: 'date' },
    submittedAt: { control: 'date' },
    authorizedAt: { control: 'date' },
    cancelledAt: { control: 'date' },
    completedAt: { control: 'date' }
  },
  args: {
    firstName: 'Derrick',
    lastName: 'Rose',
    patientId: '100001',
    clinician: 'Dr. Smith',
    poNumber: '123456',
    birthDate: new Date('1997-12-12T00:00:00'),
    status: 'COMPLETED',
    importedAt: new Date('2024-05-12T00:00:00'),
    startedAt: new Date('2024-05-12T00:00:00'),
    submittedAt: new Date('2024-05-12T00:00:00'),
    authorizedAt: new Date('2024-05-12T00:00:00'),
    cancelledAt: new Date('2024-05-12T00:00:00'),
    completedAt: new Date('2024-05-12T00:00:00'),
    isDiabetic: true,
    isVeteran: true
  } as EvaluationCardProps
};
export const Default = (args: EvaluationCardProps) => React.createElement(EvaluationCard, args);
