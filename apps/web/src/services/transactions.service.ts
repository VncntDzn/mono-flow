import { axios } from '@/libs/axios';
import { useMutation, useQuery } from 'react-query';
import { ITransactions } from '@shared/transaction.type';
import { AxiosErrorResponseData } from '@/libs/axios.types';
import { AxiosError, AxiosResponse } from 'axios';
import { notifications } from '@mantine/notifications';
import { readLocalStorageValue } from '@mantine/hooks';

export const usePostTransaction = () => {
  const user_id: string = readLocalStorageValue({ key: 'user_id' });

  return useMutation(
    async (params: Omit<ITransactions, 'user_id'>) => {
      return await axios.post<
        AxiosResponse<any>,
        AxiosError<AxiosErrorResponseData>,
        ITransactions
      >('/transactions', { ...params, user_id });
    },
    {
      onSuccess: async (data) => {
        notifications.show({
          title: 'Transaction',
          message: 'Added successfully!',
          autoClose: 3000,
          color: 'green',
        });
        return data;
      },

      onError: (err: AxiosError) => {
        notifications.show({
          title: 'Sign in',
          message: err.status !== 404 ? 'Something went wrong' : err.message,
          autoClose: 3000,
          color: 'red',
        });
      },
    },
  );
};
export const usePutTransaction = () => {
  return useMutation(
    async (param: ITransactions) => {
      return await axios.put<
        AxiosResponse<any>,
        AxiosError<AxiosErrorResponseData>,
        ITransactions
      >('/transaction', param);
    },
    {
      onSuccess: () => {},

      onError: () => {},
    },
  );
};

export const useGetTransactions = () => {
  return useQuery(['transactions'], async () => {
    return await axios.get('/transactions');
  });
};
export const useGetTransaction = () => {};

export const useDeleteTransaction = () => {
  return useMutation(
    async (id: string) => {
      return await axios.delete(`/transaction/${id}`);
    },
    {
      onSuccess: () => {},

      onError: () => {},
    },
  );
};
