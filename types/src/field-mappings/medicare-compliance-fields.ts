/**
 * Human-readable field mappings for Medicare Diabetic Compliance workflow
 * Maps technical field keys to user-friendly display names and descriptions
 */

export interface FieldMapping {
  displayName: string;
  description: string;
  category: string;
  required: boolean;
}

export const MEDICARE_COMPLIANCE_FIELD_MAPPINGS: Record<string, FieldMapping> = {
  // Patient Information
  'patient.first_name': {
    displayName: 'First Name',
    description: "Patient's first name",
    category: 'Patient Information',
    required: true
  },
  'patient.last_name': {
    displayName: 'Last Name',
    description: "Patient's last name",
    category: 'Patient Information',
    required: true
  },
  'patient.dob': {
    displayName: 'Date of Birth',
    description: "Patient's date of birth",
    category: 'Patient Information',
    required: true
  },
  'patient.medicare_mbi': {
    displayName: 'Medicare MBI',
    description: "Patient's Medicare Beneficiary Identifier",
    category: 'Patient Information',
    required: true
  },

  // Prescriber Information
  'prescriber.first_name': {
    displayName: 'Prescriber First Name',
    description: "Prescribing practitioner's first name",
    category: 'Prescriber Information',
    required: true
  },
  'prescriber.last_name': {
    displayName: 'Prescriber Last Name',
    description: "Prescribing practitioner's last name",
    category: 'Prescriber Information',
    required: true
  },
  'prescriber.npi': {
    displayName: 'Prescriber NPI',
    description: "Prescribing practitioner's National Provider Identifier",
    category: 'Prescriber Information',
    required: true
  },
  'prescriber.fax': {
    displayName: 'Prescriber Fax',
    description: "Prescribing practitioner's fax number",
    category: 'Prescriber Information',
    required: true
  },
  'prescriber.role': {
    displayName: 'Prescriber Role',
    description: "Prescribing practitioner's role",
    category: 'Prescriber Information',
    required: true
  },

  // Certifying Physician Information
  'cert.physician.first_name': {
    displayName: 'Certifying Physician First Name',
    description: "Certifying physician's first name",
    category: 'Certifying Physician',
    required: true
  },
  'cert.physician.last_name': {
    displayName: 'Certifying Physician Last Name',
    description: "Certifying physician's last name",
    category: 'Certifying Physician',
    required: true
  },
  'cert.physician.npi': {
    displayName: 'Certifying Physician NPI',
    description: "Certifying physician's National Provider Identifier",
    category: 'Certifying Physician',
    required: true
  },
  'cert.physician.fax': {
    displayName: 'Certifying Physician Fax',
    description: "Certifying physician's fax number",
    category: 'Certifying Physician',
    required: true
  },
  'cert.physician.role': {
    displayName: 'Certifying Physician Role',
    description: "Certifying physician's role (must be MD or DO)",
    category: 'Certifying Physician',
    required: true
  },

  // Prescriber Notes
  'prescriber.notes.diagnosis_visit_date': {
    displayName: 'Diagnosis Visit Date',
    description: 'Date of the visit where diabetes was diagnosed',
    category: 'Prescriber Notes',
    required: true
  },
  'prescriber.notes.signature': {
    displayName: 'Prescriber Notes Signature',
    description: 'Digital signature on prescriber notes',
    category: 'Prescriber Notes',
    required: true
  },
  'prescriber.notes.signature_date': {
    displayName: 'Prescriber Notes Signature Date',
    description: 'Date when prescriber notes were signed',
    category: 'Prescriber Notes',
    required: true
  },

  // Certifier Notes
  'cert.notes.last_dm_visit_date': {
    displayName: 'Last Diabetes Management Visit',
    description: 'Date of the last diabetes management visit',
    category: 'Certifier Notes',
    required: true
  },
  'cert.notes.visit_in_person': {
    displayName: 'In-Person Visit',
    description: 'Whether the visit was conducted in-person (telehealth not allowed)',
    category: 'Certifier Notes',
    required: true
  },
  'cert.notes.signature': {
    displayName: 'Certifier Notes Signature',
    description: 'Digital signature on certifier notes',
    category: 'Certifier Notes',
    required: true
  },
  'cert.notes.signature_date': {
    displayName: 'Certifier Notes Signature Date',
    description: 'Date when certifier notes were signed',
    category: 'Certifier Notes',
    required: true
  },

  // Foot Exam Information
  'foot_exam.date': {
    displayName: 'Foot Exam Date',
    description: 'Date when the foot examination was performed',
    category: 'Foot Examination',
    required: true
  },
  'foot_exam.examiner.name': {
    displayName: 'Foot Exam Examiner Name',
    description: 'Name of the practitioner who performed the foot exam',
    category: 'Foot Examination',
    required: true
  },
  'foot_exam.examiner.role': {
    displayName: 'Foot Exam Examiner Role',
    description: 'Role of the practitioner who performed the foot exam',
    category: 'Foot Examination',
    required: true
  },
  'foot_exam.examiner.signature': {
    displayName: 'Foot Exam Examiner Signature',
    description: 'Digital signature of the foot exam examiner',
    category: 'Foot Examination',
    required: true
  },
  'foot_exam.examiner.signature_date': {
    displayName: 'Foot Exam Examiner Signature Date',
    description: 'Date when the foot exam was signed by the examiner',
    category: 'Foot Examination',
    required: true
  },

  // Foot Exam Risk Factors
  'foot_exam.neuropathy_with_callus': {
    displayName: 'Neuropathy with Callus',
    description: 'Presence of neuropathy with callus formation',
    category: 'Foot Exam Risk Factors',
    required: false
  },
  'foot_exam.pre_ulcerative_callus': {
    displayName: 'Pre-Ulcerative Callus',
    description: 'Presence of pre-ulcerative callus',
    category: 'Foot Exam Risk Factors',
    required: false
  },
  'foot_exam.previous_ulcer': {
    displayName: 'Previous Ulcer',
    description: 'History of previous foot ulcer',
    category: 'Foot Exam Risk Factors',
    required: false
  },
  'foot_exam.deformity': {
    displayName: 'Foot Deformity',
    description: 'Presence of foot deformity',
    category: 'Foot Exam Risk Factors',
    required: false
  },
  'foot_exam.amputation_history': {
    displayName: 'Amputation History',
    description: 'History of foot or leg amputation',
    category: 'Foot Exam Risk Factors',
    required: false
  },
  'foot_exam.poor_circulation': {
    displayName: 'Poor Circulation',
    description: 'Evidence of poor circulation in the feet',
    category: 'Foot Exam Risk Factors',
    required: false
  },

  // Certifying Agreement
  'foot_exam.certifying_agreement.signature': {
    displayName: 'Certifying Agreement Signature',
    description: 'Signature of certifying physician agreeing with foot exam findings',
    category: 'Certifying Agreement',
    required: false
  },
  'foot_exam.certifying_agreement.date': {
    displayName: 'Certifying Agreement Date',
    description: 'Date when certifying physician agreed with foot exam findings',
    category: 'Certifying Agreement',
    required: false
  },

  // Certifying Statement
  'cert.statement.signature': {
    displayName: 'Certifying Statement Signature',
    description: 'Digital signature on the certifying statement',
    category: 'Certifying Statement',
    required: true
  },
  'cert.statement.signature_date': {
    displayName: 'Certifying Statement Signature Date',
    description: 'Date when the certifying statement was signed',
    category: 'Certifying Statement',
    required: true
  },
  'cert.statement.manages_diabetes': {
    displayName: 'Manages Diabetes',
    description: "Certifier attests to managing the patient's diabetes",
    category: 'Certifying Statement',
    required: true
  },
  'cert.statement.patient_needs_diabetic_footwear': {
    displayName: 'Patient Needs Diabetic Footwear',
    description: 'Certifier attests that patient needs therapeutic footwear',
    category: 'Certifying Statement',
    required: true
  },

  // Initial Prescription
  'rx.initial.order_date': {
    displayName: 'Initial Rx Order Date',
    description: 'Date when the initial prescription was ordered',
    category: 'Initial Prescription',
    required: true
  },
  'rx.initial.order_description': {
    displayName: 'Initial Rx Order Description',
    description: 'Description of the initial prescription order',
    category: 'Initial Prescription',
    required: true
  },
  'rx.initial.signature': {
    displayName: 'Initial Rx Signature',
    description: 'Digital signature on the initial prescription',
    category: 'Initial Prescription',
    required: true
  },
  'rx.initial.signature_date': {
    displayName: 'Initial Rx Signature Date',
    description: 'Date when the initial prescription was signed',
    category: 'Initial Prescription',
    required: true
  },

  // Statement of Work Order (SWO)
  'swo.treating_practitioner.signature': {
    displayName: 'SWO Treating Practitioner Signature',
    description: 'Digital signature of the treating practitioner on the SWO',
    category: 'Statement of Work Order',
    required: true
  },
  'swo.treating_practitioner.signature_date': {
    displayName: 'SWO Treating Practitioner Signature Date',
    description: 'Date when the SWO was signed by the treating practitioner',
    category: 'Statement of Work Order',
    required: true
  },
  'swo.order_date': {
    displayName: 'SWO Order Date',
    description: 'Date when the statement of work order was created',
    category: 'Statement of Work Order',
    required: true
  },
  'swo.general_description': {
    displayName: 'SWO General Description',
    description: 'General description of the work order',
    category: 'Statement of Work Order',
    required: true
  },
  'swo.hcpcs': {
    displayName: 'SWO HCPCS Codes',
    description: 'HCPCS for SWO',
    category: 'Statement of Work Order',
    required: true
  },
  'swo.quantity_each_hcpcs': {
    displayName: 'SWO Quantity for Each HCPCS',
    description: 'Quantity for each HCPCS code in the order',
    category: 'Statement of Work Order',
    required: true
  },

  // Diagnosis Information
  'dx.icd_codes': {
    displayName: 'ICD-10 Codes',
    description: 'ICD-10 diagnosis codes (must include diabetes E08-E13)',
    category: 'Diagnosis Information',
    required: true
  },
  'dx.diabetes.code': {
    displayName: 'Diabetes ICD-10 Code',
    description: 'ICD-10 code for diabetes diagnosis (E08-E13)',
    category: 'Diagnosis Information',
    required: true
  },
  'dx.qualifying_condition.list': {
    displayName: 'Qualifying Conditions',
    description: 'List of qualifying foot-risk conditions',
    category: 'Diagnosis Information',
    required: false
  },
  'dx.qualifying_condition.details': {
    displayName: 'Qualifying Condition Details',
    description: 'Detailed description of qualifying foot-risk conditions',
    category: 'Diagnosis Information',
    required: false
  },

  // Operations
  'ops.delivery.date': {
    displayName: 'Delivery Date',
    description: 'Date when the diabetic footwear was delivered',
    category: 'Operations',
    required: false
  },

  // Notifications
  'notification.outbound': {
    displayName: 'Outbound Notifications',
    description: 'Records of outbound notifications sent',
    category: 'Notifications',
    required: false
  },

  // Payer information
  'payer.primary.name': {
    displayName: 'Primary Payer Name',
    description: 'Name of the primary insurance payer',
    category: 'Payer Information',
    required: false
  },
  'payer.primary.member_id': {
    displayName: 'Primary Payer Member ID',
    description: 'Member ID for the primary insurance payer',
    category: 'Payer Information',
    required: false
  },
  'payer.secondary.name': {
    displayName: 'Secondary Payer Name',
    description: 'Name of the secondary insurance payer',
    category: 'Payer Information',
    required: false
  },
  'payer.secondary.member_id': {
    displayName: 'Secondary Payer Member ID',
    description: 'Member ID for the secondary insurance payer',
    category: 'Payer Information',
    required: false
  },

  // Other
  'fitter.clinic_name': {
    displayName: 'Fitter Clinic Name',
    description: 'Name of the clinic where the footwear was fitted',
    category: 'Other',
    required: false
  }
};

/**
 * Get human-readable field information for a given field key
 */
export function getFieldMapping(fieldKey: string): FieldMapping | undefined {
  return MEDICARE_COMPLIANCE_FIELD_MAPPINGS[fieldKey];
}

/**
 * Get all field mappings grouped by category
 */
export function getFieldMappingsByCategory(): Record<string, Array<{ key: string; mapping: FieldMapping }>> {
  const categories: Record<string, Array<{ key: string; mapping: FieldMapping }>> = {};

  Object.entries(MEDICARE_COMPLIANCE_FIELD_MAPPINGS).forEach(([key, mapping]) => {
    if (!categories[mapping.category]) {
      categories[mapping.category] = [];
    }
    categories[mapping.category]?.push({ key, mapping });
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
