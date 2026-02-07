export interface AnodyneFilterOption {
  value: string;
  description?: string;
}

export interface AnodyneFiltersResponse {
  categories: AnodyneFilterOption[];
  genders: AnodyneFilterOption[];
}
