export interface ApiResponse<T = unknown> {
  data: T[] | T;
  include?: {
    [key: string]: unknown[] | unknown;
  };
}
