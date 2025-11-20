export interface ConsolidationDetails {
  readonly candidatePatientId: string;
  readonly confidence: 'HIGH' | 'LOW';
  readonly details: {
    readonly hasOrders: boolean;
    readonly orderCount: number;
  };
}
