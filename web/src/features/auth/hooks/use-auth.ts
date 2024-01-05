import { axios } from '@/libs/axios';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { ISignin, ISignup } from '../types/auth.types';

import {
  AuthResponseData,
  AxiosErrorResponseData,
  AxiosResponseData,
} from '@/libs/axios.types';
import { notifications } from '@mantine/notifications';

export const useSignup = () => {
  const navigate = useNavigate();
  return useMutation<
    AxiosResponseData<AuthResponseData>,
    AxiosError<AxiosErrorResponseData>,
    ISignup
  >(
    async ({ first_name, last_name, email, password }: ISignup) => {
      return await axios.post('/auth/signup', {
        first_name,
        last_name,
        email,
        password,
      });
    },
    {
      onSuccess: () => {
        navigate('/dashboard');
      },
      onError: (err) => {
        notifications.show({
          title: 'Sign in',
          message: err?.response?.data.message ?? err.message,
          autoClose: 3000,
          color: 'red',
        });
      },
    },
  );
};

export const useSignin = () => {
  const navigate = useNavigate();
  return useMutation<
    AxiosResponseData<AuthResponseData>,
    AxiosError<AxiosErrorResponseData>,
    ISignin
  >(
    async ({ email, password }: ISignin) => {
      return await axios.post('/auth/signin', {
        email,
        password,
      });
    },
    {
      onSuccess: () => {
        navigate('/dashboard');
      },
      onError: (err) => {
        notifications.show({
          title: 'Sign in',
          message: err?.response?.data.message ?? err.message,
          autoClose: 3000,
          color: 'red',
        });
      },
    },
  );
};

export const useForgotPassword = () => {};
