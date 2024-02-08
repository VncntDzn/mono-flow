export interface AxiosErrorResponseData {
  message: string;
  statusCode: number;
  error: string;
}
export interface AuthResponseData {
  status: number;
  message: string;
  include: { access_token: string; refresh_token?: string; user_id: string };
}
