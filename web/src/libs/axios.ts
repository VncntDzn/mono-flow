import Axios, { AxiosInstance } from 'axios';
import localForage from 'localforage';

export const axios: AxiosInstance = Axios.create({
  baseURL: 'http://localhost:3000/api',
});

axios.interceptors.request.use((config) => {
  // Read token from localStorage
  const token = localForage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axios.interceptors.response.use(
  (response) => {
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
