/**
 * Generic type for paged response from API services.
 */
export interface PagedResponse<T> {
  data: T;
  total: number;
  pageIndex: number;
  pageSize: number;
}

/**
 * Type used to store state of pagination for components.
 */
export interface PaginationState {
  pageIndex: number;
  pageSize: number;
  limit: number;
}

/**
 * Type used to store state of sorting for components.
 */
export interface SortingState {
  field: string;
  order: 'asc' | 'desc';
}
