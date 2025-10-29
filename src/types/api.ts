// /types/api.ts
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
export type SortParam = { field: string; order: "asc" | "desc" };
export type SearchParam = { searchText: string; searchBy: string; }
export type Page<T = any> = {
  data: T[];
  page: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
};
