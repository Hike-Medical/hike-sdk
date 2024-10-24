import { createElement } from 'react';
import { PatientCard, PatientCardProps } from './PatientCard';

export default {
  component: PatientCard,
  title: 'PatientCard',
  argTypes: {
    id: { control: 'text' },
    firstName: { control: 'text' },
    middleName: { control: 'text' },
    lastName: { control: 'text' },
    birthDate: { control: 'date' },
    evaluations: [
      {
        isDiabetic: { control: 'boolean' },
        isVeteran: { control: 'boolean' },
        startedAt: { control: 'date' }
      }
    ]
  },
  args: {
    id: '100001',
    firstName: 'Derrick',
    lastName: 'Rose',
    birthDate: new Date('1997-12-12T00:00:00'),
    evaluations: [
      {
        isDiabetic: false,
        isVeteran: false,
        startedAt: new Date('2024-05-12T00:00:00')
      }
    ]
  } as PatientCardProps
};
export const Default = (args: PatientCardProps) => createElement(PatientCard, args);
