/**
 * Human-readable field mappings for Medicare Diabetic Compliance workflow
 * Maps technical field keys to user-friendly display names and descriptions
 */
import { z } from 'zod';
import { formatPhoneNumber } from '../utils/converters/formatPhoneNumber';

interface FactsRegistryEntry {
  schema: z.ZodType;
  displayName: string;
  description: string;
  category: string;
  required: boolean;
  hideInUX?: boolean;
  transform?: (value: FactValueOf<FactKey>) => FactValueOf<FactKey>;
}

const dateISO = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DD');
const icd10Code = z.string().regex(/^[A-TV-Z][0-9][A-Z0-9](?:\.?[A-Z0-9]{1,4})?$/, 'ICD-10 code');
const npi10 = z.string().regex(/^\d{10}$/, '10-digit NPI');
const hcpcsCode = z.string().regex(/^[A-VY][0-9]{4}$/, 'HCPCS code (e.g., A5512)');
const usOrCAPhoneNumber = z.string().regex(/^\+1\d{10}$/, 'US or Canada phone number');

export const FactRegistry = {
  // Patient Information
  'patient.first_name': {
    displayName: 'First Name',
    description: "Patient's first name",
    category: 'Patient Information',
    required: true,
    schema: z.string().min(1)
  },
  'patient.last_name': {
    displayName: 'Last Name',
    description: "Patient's last name",
    category: 'Patient Information',
    required: true,
    schema: z.string().min(1)
  },
  'patient.phone': {
    displayName: 'Phone Number',
    description: "Patient's phone number",
    category: 'Patient Information',
    required: true,
    schema: usOrCAPhoneNumber,
    transform: formatPhoneNumber
  },
  'patient.dob': {
    displayName: 'Date of Birth',
    description: "Patient's date of birth",
    category: 'Patient Information',
    required: true,
    schema: dateISO
  },
  'patient.medicare_mbi': {
    displayName: 'Medicare MBI',
    description: "Patient's Medicare Beneficiary Identifier",
    category: 'Patient Information',
    required: true,
    schema: z.string().min(1)
  },
  'patient.external_patient_id': {
    displayName: 'External Patient ID',
    description: 'External identifier for the patient',
    category: 'Patient Information',
    required: false,
    schema: z.string().min(1)
  },
  'patient.external_evaluation_id': {
    displayName: 'External Evaluation ID',
    description: 'External identifier for the patient evaluation',
    category: 'Patient Information',
    required: false,
    schema: z.string().min(1)
  },
  'patient.sex': {
    displayName: 'Sex',
    description: "Patient's sex (M, F, X, or unknown)",
    category: 'Patient Information',
    required: false,
    schema: z.enum(['M', 'F', 'X', 'unknown'])
  },
  'patient.address': {
    displayName: 'Address',
    description: "Patient's address",
    category: 'Patient Information',
    required: false,
    schema: z.string().min(1)
  },

  // Prescriber Information
  'prescriber.first_name': {
    displayName: 'Prescriber First Name',
    description: "Prescribing practitioner's first name",
    category: 'Prescriber Information',
    required: true,
    schema: z.string().min(1)
  },
  'prescriber.last_name': {
    displayName: 'Prescriber Last Name',
    description: "Prescribing practitioner's last name",
    category: 'Prescriber Information',
    required: true,
    schema: z.string().min(1)
  },
  'prescriber.phone': {
    displayName: 'Prescriber Phone',
    description: "Prescribing practitioner's phone number",
    category: 'Prescriber Information',
    required: true,
    schema: usOrCAPhoneNumber,
    transform: formatPhoneNumber
  },
  'prescriber.npi': {
    displayName: 'Prescriber NPI',
    description: "Prescribing practitioner's National Provider Identifier",
    category: 'Prescriber Information',
    required: true,
    schema: npi10
  },
  'prescriber.fax': {
    displayName: 'Prescriber Fax',
    description: "Prescribing practitioner's fax number",
    category: 'Prescriber Information',
    required: true,
    schema: usOrCAPhoneNumber,
    transform: formatPhoneNumber
  },
  'prescriber.role': {
    displayName: 'Prescriber Role',
    description: "Prescribing practitioner's role",
    category: 'Prescriber Information',
    required: true,
    schema: z.string().min(1)
  },

  // Certifying Physician Information
  'cert.physician.first_name': {
    displayName: 'Certifying Physician First Name',
    description: "Certifying physician's first name",
    category: 'Certifying Physician',
    required: true,
    schema: z.string().min(1)
  },
  'cert.physician.last_name': {
    displayName: 'Certifying Physician Last Name',
    description: "Certifying physician's last name",
    category: 'Certifying Physician',
    required: true,
    schema: z.string().min(1)
  },
  'cert.physician.npi': {
    displayName: 'Certifying Physician NPI',
    description: "Certifying physician's National Provider Identifier",
    category: 'Certifying Physician',
    required: true,
    schema: npi10
  },
  'cert.physician.fax': {
    displayName: 'Certifying Physician Fax',
    description: "Certifying physician's fax number",
    category: 'Certifying Physician',
    required: true,
    schema: usOrCAPhoneNumber,
    transform: formatPhoneNumber
  },
  'cert.physician.role': {
    displayName: 'Certifying Physician Role',
    description: "Certifying physician's role (must be MD or DO)",
    category: 'Certifying Physician',
    required: true,
    schema: z.string().min(1)
  },
  'cert.physician.address': {
    displayName: 'Certifying Physician Address',
    description: 'Mailing address of the certifying physician',
    category: 'Certifying Physician',
    required: false,
    schema: z.string().min(1)
  },
  'cert.physician.clinic_name': {
    displayName: 'Certifying Physician Clinic Name',
    description: 'Clinic name of the certifying physician',
    category: 'Certifying Physician',
    required: false,
    schema: z.string().min(1)
  },
  'cert.physician.phone': {
    displayName: 'Certifying Physician Phone',
    description: 'Phone number of the certifying physician',
    category: 'Certifying Physician',
    required: false,
    schema: usOrCAPhoneNumber,
    transform: formatPhoneNumber
  },

  // Prescriber Notes
  'prescriber.notes.diagnosis_visit_date': {
    displayName: 'Diagnosis Visit Date',
    description: 'Date of the visit where prescriber foot exam',
    category: 'Prescriber Notes',
    required: true,
    schema: dateISO
  },
  'prescriber.notes.signature': {
    displayName: 'Prescriber Notes Signature',
    description: 'Digital signature on prescriber notes',
    category: 'Prescriber Notes',
    required: true,
    schema: z.boolean()
  },
  'prescriber.notes.signature_date': {
    displayName: 'Prescriber Notes Signature Date',
    description: 'Date when prescriber notes were signed',
    category: 'Prescriber Notes',
    required: true,
    schema: dateISO
  },
  'prescriber.clinic_name': {
    displayName: 'Prescriber Clinic Name',
    description: 'Clinic name of the prescribing practitioner',
    category: 'Prescriber Information',
    required: false,
    schema: z.string().min(1)
  },

  // Certifier Notes
  'cert.notes.last_dm_visit_date': {
    displayName: 'Last Diabetes Management Visit',
    description: 'Date of the last diabetes management visit',
    category: 'Certifier Notes',
    required: true,
    schema: dateISO
  },
  'cert.notes.manages_diabetes': {
    displayName: 'Manages Diabetes',
    description: "Certifier attests to managing the patient's diabetes",
    category: 'Certifier Notes',
    required: true,
    schema: z.boolean()
  },
  'cert.notes.patient_needs_diabetic_footwear': {
    displayName: 'Patient Needs Diabetic Footwear',
    description: 'Certifier attests that patient needs therapeutic footwear',
    category: 'Certifier Notes',
    required: true,
    schema: z.boolean()
  },
  'cert.notes.visit_in_person': {
    displayName: 'In-Person Visit',
    description: 'Whether the visit was conducted in-person',
    category: 'Certifier Notes',
    required: true,
    schema: z.boolean()
  },
  'cert.notes.signature': {
    displayName: 'Certifier Notes Signature',
    description: 'Digital signature on certifier notes',
    category: 'Certifier Notes',
    required: true,
    schema: z.boolean()
  },
  'cert.notes.signature_date': {
    displayName: 'Certifier Notes Signature Date',
    description: 'Date when certifier notes were signed',
    category: 'Certifier Notes',
    required: true,
    schema: dateISO
  },
  'cert.notes.qualifying_condition.list': {
    displayName: 'Qualifying Conditions',
    description: 'List of qualifying foot-risk conditions',
    category: 'Diagnosis Information',
    required: false,
    schema: z
      .array(
        z.enum([
          'amputation_history',
          'previous_foot_ulcer',
          'pre_ulcerative_callus',
          'peripheral_neuropathy_with_callus',
          'foot_deformity',
          'poor_circulation'
        ])
      )
      .min(1)
  },
  'cert.notes.qualifying_condition.details': {
    displayName: 'Qualifying Condition Details',
    description: 'Detailed description of qualifying foot-risk conditions',
    category: 'Certifier Notes',
    required: false,
    schema: z.string().min(1)
  },

  // Foot Exam Information
  'foot_exam.date': {
    displayName: 'Foot Exam Date',
    description: 'Date when the foot examination was performed',
    category: 'Foot Examination',
    required: true,
    schema: dateISO
  },
  'foot_exam.examiner.name': {
    displayName: 'Foot Exam Examiner Name',
    description: 'Name of the practitioner who performed the foot exam',
    category: 'Foot Examination',
    required: true,
    schema: z.string().min(1)
  },
  'foot_exam.examiner.role': {
    displayName: 'Foot Exam Examiner Role',
    description: 'Role of the practitioner who performed the foot exam',
    category: 'Foot Examination',
    required: true,
    schema: z.string().min(1)
  },
  'foot_exam.examiner.signature': {
    displayName: 'Foot Exam Examiner Signature',
    description: 'Digital signature of the foot exam examiner',
    category: 'Foot Examination',
    required: true,
    schema: z.boolean()
  },
  'foot_exam.examiner.signature_date': {
    displayName: 'Foot Exam Examiner Signature Date',
    description: 'Date when the foot exam was signed by the examiner',
    category: 'Foot Examination',
    required: true,
    schema: dateISO
  },

  'foot_exam.examiner.qualifying_condition.list': {
    displayName: 'Foot Exam Examiner Qualifying Conditions',
    description: 'List of qualifying foot-risk conditions found during foot exam',
    category: 'Diagnosis Information',
    required: false,
    schema: z
      .array(
        z.object({
          condition: z.enum([
            'amputation_history',
            'previous_foot_ulcer',
            'pre_ulcerative_callus',
            'peripheral_neuropathy_with_callus',
            'foot_deformity',
            'poor_circulation'
          ]),
          details: z.string().min(1)
        })
      )
      .min(1)
  },

  // Certifying Agreement
  'foot_exam.certifying_agreement.signature': {
    displayName: 'Certifying Agreement Signature',
    description: 'Signature of certifying physician agreeing with foot exam findings',
    category: 'Certifying Agreement',
    required: false,
    schema: z.boolean()
  },
  'foot_exam.certifying_agreement.date': {
    displayName: 'Certifying Agreement Date',
    description: 'Date when certifying physician agreed with foot exam findings',
    category: 'Certifying Agreement',
    required: false,
    schema: dateISO
  },

  'foot_exam.certifying_agreement.note': {
    displayName: 'Certifying Agreement Note',
    description: 'Notes from certifying physician regarding the foot exam agreement',
    category: 'Certifying Agreement',
    required: false,
    schema: z.string().min(1)
  },

  // Certifying Statement
  'cert.statement.signature': {
    displayName: 'Certifying Statement Signature',
    description: 'Digital signature on the certifying statement',
    category: 'Certifying Statement',
    required: true,
    schema: z.boolean()
  },
  'cert.statement.signature_date': {
    displayName: 'Certifying Statement Signature Date',
    description: 'Date when the certifying statement was signed',
    category: 'Certifying Statement',
    required: true,
    schema: dateISO
  },

  'cert.statement.qualifying_condition.list': {
    displayName: 'Qualifying Conditions',
    description: 'List of qualifying foot-risk conditions',
    category: 'Certifying Statement',
    required: false,
    schema: z
      .array(
        z.enum([
          'amputation_history',
          'previous_foot_ulcer',
          'pre_ulcerative_callus',
          'peripheral_neuropathy_with_callus',
          'foot_deformity',
          'poor_circulation'
        ])
      )
      .min(1)
  },

  // Initial Prescription
  'rx.initial.order_date': {
    displayName: 'Initial Rx Order Date',
    description: 'Date when the initial prescription was ordered',
    category: 'Initial Prescription',
    required: true,
    schema: dateISO
  },
  'rx.initial.order_description': {
    displayName: 'Initial Rx Order Description',
    description: 'Description of the initial prescription order',
    category: 'Initial Prescription',
    required: true,
    schema: z.string().min(1)
  },
  'rx.diagnosis.description': {
    displayName: 'Diagnosis Description',
    description: 'Description of the diagnosis',
    category: 'Diagnosis Information',
    required: true,
    schema: z.string().min(1)
  },
  'rx.initial.signature': {
    displayName: 'Initial Rx Signature',
    description: 'Digital signature on the initial prescription',
    category: 'Initial Prescription',
    required: true,
    schema: z.boolean()
  },
  'rx.initial.signature_date': {
    displayName: 'Initial Rx Signature Date',
    description: 'Date when the initial prescription was signed',
    category: 'Initial Prescription',
    required: true,
    schema: dateISO
  },

  // Statement of Work Order (SWO)
  'swo.treating_practitioner.signature': {
    displayName: 'SWO Treating Practitioner Signature',
    description: 'Digital signature of the treating practitioner on the SWO',
    category: 'Statement of Work Order',
    required: true,
    schema: z.boolean()
  },
  'swo.treating_practitioner.signature_date': {
    displayName: 'SWO Treating Practitioner Signature Date',
    description: 'Date when the SWO was signed by the treating practitioner',
    category: 'Statement of Work Order',
    required: true,
    schema: dateISO
  },
  'swo.order_date': {
    displayName: 'SWO Order Date',
    description: 'Date when the statement of work order was created',
    category: 'Statement of Work Order',
    required: true,
    schema: dateISO
  },
  'swo.general_description': {
    displayName: 'SWO General Description',
    description: 'General description of the work order',
    category: 'Statement of Work Order',
    required: true,
    schema: z.string().min(1)
  },

  'swo.quantity_each_hcpcs': {
    displayName: 'SWO Quantity for Each HCPCS',
    description: 'Quantity for each HCPCS code in the order',
    category: 'Statement of Work Order',
    required: true,
    schema: z
      .array(
        z.object({
          code: hcpcsCode,
          quantity: z.number().int().min(0)
        })
      )
      .min(1)
  },

  // Diagnosis Information
  'dx.icd_codes': {
    displayName: 'ICD-10 Codes',
    description: 'ICD-10 diagnosis codes (must include diabetes E08-E13)',
    category: 'Diagnosis Information',
    required: true,
    schema: z.array(icd10Code).min(1)
  },

  // Operations
  'ops.delivery.date': {
    displayName: 'Delivery Date',
    description: 'Date when the diabetic footwear was delivered',
    category: 'Operations',
    required: false,
    schema: dateISO
  },

  // Notifications
  'notification.outbound': {
    displayName: 'Outbound Notifications',
    description: 'Records of outbound notifications sent',
    category: 'Notifications',
    required: false,
    schema: z.array(
      z.object({
        contact: z.string().min(1),
        senderStatus: z.enum(['SENT', 'UNDELIVERED', 'DELIVERED']).optional(),
        historyId: z.string().min(1),
        jobId: z.string().min(1),
        stepName: z.string().min(1)
      })
    ),
    hideInUX: true
  },

  // Workflow Information
  'internal.workflow.compliance': {
    displayName: 'Merged Workflow Information',
    description: 'Merged Workflow Information',
    category: 'Workflow Information',
    required: false,
    schema: z.object({
      matchFound: z.boolean(),
      id: z.string().min(1).optional(),
      merged: z.boolean(),
      createNew: z.boolean()
    }),
    hideInUX: true
  },

  'internal.workflow.resolved': {
    displayName: 'Workflow Resolved',
    description: 'Indicates if the workflow has been marked as resolved',
    category: 'Workflow Information',
    required: false,
    schema: z.boolean(),
    hideInUX: true
  },

  'internal.prescription.forwarded': {
    displayName: 'Initial Prescription Forwarded',
    description: 'Initial Prescription Forwarded',
    category: 'Workflow Information',
    required: false,
    schema: z.object({
      needsForwarding: z.boolean(),
      forwarded: z.boolean()
    }),
    hideInUX: true
  },

  'internal.no_response_fax': {
    displayName: 'No Response Fax Information',
    description: 'No Response Fax Information',
    category: 'Workflow Information',
    required: false,
    schema: z.boolean(),
    hideInUX: true
  },

  // Payer information
  'payer.primary.name': {
    displayName: 'Primary Payer Name',
    description: 'Name of the primary insurance payer',
    category: 'Payer Information',
    required: false,
    schema: z.string().min(1)
  },
  'payer.primary.member_id': {
    displayName: 'Primary Payer Member ID',
    description: 'Member ID for the primary insurance payer',
    category: 'Payer Information',
    required: false,
    schema: z.string().min(1)
  },
  'payer.secondary.name': {
    displayName: 'Secondary Payer Name',
    description: 'Name of the secondary insurance payer',
    category: 'Payer Information',
    required: false,
    schema: z.string().min(1)
  },
  'payer.secondary.member_id': {
    displayName: 'Secondary Payer Member ID',
    description: 'Member ID for the secondary insurance payer',
    category: 'Payer Information',
    required: false,
    schema: z.string().min(1)
  },

  // Other
  'fitter.clinic_name': {
    displayName: 'Fitter Clinic Name',
    description: 'Name of the clinic where the footwear was fitted',
    category: 'Other',
    required: false,
    schema: z.string().min(1)
  }
} as const;

type Registry = typeof FactRegistry;

export type FactKey = keyof Registry;

export type FactValueOf<K extends FactKey> = z.infer<Registry[K]['schema']>;

// Union of all possible fact values
export type AnyFactValue = FactValueOf<FactKey>;

/**
 * Get human-readable field information for a given field key
 */
export function getFieldMapping(fieldKey: string): FactsRegistryEntry | undefined {
  return FactRegistry[fieldKey as FactKey] as FactsRegistryEntry | undefined;
}

/**
 * Get all field mappings grouped by category
 */
export function getFieldMappingsByCategory(): Record<string, { key: string; mapping: FactsRegistryEntry }[]> {
  const categories: Record<string, { key: string; mapping: FactsRegistryEntry }[]> = {};

  Object.entries(FactRegistry).forEach(([key, mapping]) => {
    if (!categories[mapping.category]) {
      categories[mapping.category] = [];
    }
    categories[mapping.category]?.push({ key, mapping: mapping as FactsRegistryEntry });
  });

  return categories;
}

/**
 * Get display name for a field key, falling back to the key itself if no mapping exists
 */
export function getFieldDisplayName(fieldKey: string): string {
  const mapping = getFieldMapping(fieldKey);
  return mapping?.displayName || fieldKey;
}

/**
 * Get description for a field key, falling back to empty string if no mapping exists
 */
export function getFieldDescription(fieldKey: string): string {
  const mapping = getFieldMapping(fieldKey);
  return mapping?.description || '';
}

/**
 * Get category for a field key, falling back to 'Other' if no mapping exists
 */
export function getFieldCategory(fieldKey: string): string {
  const mapping = getFieldMapping(fieldKey);
  return mapping?.category || 'Other';
}
