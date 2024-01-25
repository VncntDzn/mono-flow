export interface ApiResponse<T = unknown> {
  status: number;
  message: string;
  data?: T[] | T;
  include?: {
    [key: string]: unknown[] | unknown;
  };
}
