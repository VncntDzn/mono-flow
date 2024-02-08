import { axios } from '@/libs/axios';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

import {
  AuthResponseData,
  AxiosErrorResponseData,
  AxiosResponseData,
} from '@/libs/axios.types';
import { notifications } from '@mantine/notifications';
import { ISignin, ISignup } from '@shared/auth.types';

export const useSignup = () => {
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
      onSuccess: async (data) => {
        notifications.show({
          title: 'Sign up',
          message: 'Success',
          autoClose: 3000,
          color: 'green',
        });
        return data;
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
      onSuccess: async (data) => {
        notifications.show({
          title: 'Sign in',
          message: "Success, you're now logged in",
          autoClose: 3000,
          color: 'green',
        });

        return data;
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
