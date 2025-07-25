interface CompanyTurnaroundStats {
  companyName: string | null;
  turnaroundHours: number | null;
  deliveryDiffHours: number | null;
}

export type CompanyTurnaroundStatsResponse = CompanyTurnaroundStats[];
