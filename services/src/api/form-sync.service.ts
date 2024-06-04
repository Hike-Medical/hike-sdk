import type { EvaluationExtended, FormFieldValue, FormSection, Gender, Side, VerticalPosition } from '@hike/types';
import { formatConstant, parseDate } from '@hike/utils';
import { updateEvaluation } from './evaluation.service';
import { updatePatient } from './patient.service';

/**
 * Updates patients with form submission.
 */
export const formSubmissionToPatient = async (patientId: string, formState: Record<string, FormFieldValue>) =>
  await updatePatient(patientId, {
    birthDate: formState.birthDate !== undefined ? parseDate(formState.birthDate as string) : undefined,
    gender: formState.gender !== undefined ? (formState.gender as Gender) : undefined,
    height: formState.height !== undefined ? Number(formState.height as string) || null : undefined,
    weight: formState.weight !== undefined ? Number(formState.weight as string) || null : undefined
  });

/**
 * Updates evaluation with form submission.
 */
export const formSubmissionToEvaluation = async (evaluationId: string, formState: Record<string, FormFieldValue>) =>
  await updateEvaluation(evaluationId, {
    deviceTypeId: formState.deviceTypeId !== undefined ? (formState.deviceTypeId as string) : undefined,
    devicePosition: formState.devicePosition !== undefined ? (formState.devicePosition as VerticalPosition) : undefined,
    deviceSide: formState.deviceSide !== undefined ? (formState.deviceSide as Side) : undefined,
    referringPhysicianId:
      formState.referringPhysicianId !== undefined ? (formState.referringPhysicianId as string) : undefined,
    diagnosisId: formState.diagnosisId !== undefined ? (formState.diagnosisId as string) : undefined,
    diagnosisedAt: parseDate(formState.diagnosisedAt as string) ?? undefined,
    prescribedAt: parseDate(formState.prescribedAt as string) ?? undefined,
    facilityId: formState.facilityId !== undefined ? (formState.facilityId as string) : undefined,
    location: formState.location !== undefined ? (formState.location as string) : undefined
  });

/**
 * Retrieves form defaults from evaluation.
 */
export const formSchemaEvaluationDefaults = (
  sections: FormSection[],
  evaluation: EvaluationExtended
): Record<string, FormFieldValue> =>
  sections
    .flatMap((section) => section.fields)
    .reduce(
      (acc, field) => {
        switch (field.name) {
          case 'birthDate':
            acc[field.name] = parseDate(evaluation.patient.birthDate)?.toISOString();
            break;
          case 'gender':
            acc[field.name] = evaluation.patient.gender;
            break;
          case 'height':
            acc[field.name] = evaluation.patient.height !== null ? String(evaluation.patient.height) : null;
            break;
          case 'weight':
            acc[field.name] = evaluation.patient.weight !== null ? String(evaluation.patient.weight) : null;
            break;
          case 'referringPhysicianId':
            acc[field.name] = evaluation.referringPhysicianId;
            acc[`${field.name}-label`] = evaluation.referringPhysician?.name;
            break;
          case 'diagnosisId':
            acc[field.name] = evaluation.diagnosisId;
            acc[`${field.name}-label`] = evaluation.diagnosis ? evaluation.diagnosis.code : undefined;
            break;
          case 'diagnosisNotes':
            acc[field.name] = evaluation.diagnosis ? evaluation.diagnosis.description : undefined;
            break;
          case 'diagnosisedAt':
            acc[field.name] = parseDate(evaluation.diagnosisedAt)?.toISOString();
            break;
          case 'prescribedAt':
            acc[field.name] = parseDate(evaluation.prescribedAt)?.toISOString();
            break;
          case 'location':
            acc[field.name] = evaluation.location;
            break;
          case 'deviceTypeId':
            acc[field.name] = evaluation.deviceTypeId;
            acc[`${field.name}-label`] = evaluation.deviceType?.name;
            break;
          case 'prescription':
            acc[field.name] = evaluation.deviceType?.name;
            break;
          case 'deviceTypeSide':
            acc[field.name] = evaluation.deviceSide;
            acc[`${field.name}-label`] = evaluation.deviceSide ? formatConstant(evaluation.deviceSide) : undefined;
            break;
          case 'deviceTypePosition':
            acc[field.name] = evaluation.devicePosition;
            acc[`${field.name}-label`] = evaluation.devicePosition
              ? formatConstant(evaluation.devicePosition)
              : undefined;
            break;
          case 'clinician':
            acc[field.name] = evaluation.clinicians?.[0]?.name;
            break;
          case 'facilityId':
            acc[field.name] = evaluation.facilityId;
            acc[`${field.name}-label`] = evaluation.facility?.name;
            break;
          default:
            acc[field.name] = null;
            break;
        }

        return acc;
      },
      {} as Record<string, FormFieldValue>
    );
