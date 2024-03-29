import { User } from '@/types';

export interface AxiosResponseData<T> {
  data: T;
}
export interface AxiosErrorResponseData {
  message: string;
  statusCode: number;
  error: string;
}
export interface AuthResponseData {
  user: User;
  include: { access_token: string; refresh_token?: string };
}
