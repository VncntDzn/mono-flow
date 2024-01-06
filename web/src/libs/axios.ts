import Axios, { AxiosInstance } from 'axios';
import localForage from 'localforage';

export const axios: AxiosInstance = Axios.create({
  baseURL: import.meta.env.VITE_API,
});

axios.interceptors.request.use(async (config) => {
  // Read token from localStorage
  const token = await localForage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axios.interceptors.response.use(
  async (response) => {
    await localForage.setItem('access_token', response.data.access_token);

    return response;
  },
  (error) => {
    // Log out when 401 received
    if (error?.response?.status === 401) {
      localForage.clear();
    }

    return Promise.reject(error);
  },
);
