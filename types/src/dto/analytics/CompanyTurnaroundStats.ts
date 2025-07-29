interface CompanyTurnaroundStats {
  companyName: string | null;
  turnaroundDays: number | null;
  deliveryDiffDays: number | null;
}

export type CompanyTurnaroundStatsResponse = CompanyTurnaroundStats[];
