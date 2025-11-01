export interface OrthofeetFilterOption {
  value: string;
  description?: string;
}

export interface OrthofeetFiltersResponse {
  categories: OrthofeetFilterOption[];
  genders: OrthofeetFilterOption[];
}
