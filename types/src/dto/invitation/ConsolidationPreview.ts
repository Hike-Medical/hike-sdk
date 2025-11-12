export interface ConsolidationPreview {
  newPatient: {
    id: string;
    name: string;
    email: string | null;
    phone: string | null;
    hasUser: boolean;
    orderCount: number;
    lastOrderDate: Date | null;
  };
  existingPatient: {
    id: string;
    name: string;
    email: string | null;
    phone: string | null;
    externalId: string | null;
    orderCount: number;
    lastOrderDate: Date | null;
  };
  recommendation: 'new' | 'existing';
}

