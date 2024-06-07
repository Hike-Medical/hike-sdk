export interface AdditionalFormInfo {
  firstName: string;
  lastName: string;
  poNumber: string;
  clinicianName: string;
  externalId: string;
  workbenchId: string;
  evaluationId: string;
  patientId: string;
  submittedAt: Date;
  signatureBuffer: Buffer;
  signatureSignedAt: string;
  notes: {
    blocks: {
      image: Buffer;
      description: string | undefined;
      height: number | undefined;
      width: number | undefined;
    }[];
    tags: string[];
    title: string | null;
    content: string | null;
  }[];
}
