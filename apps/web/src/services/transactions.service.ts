import { axios } from '@/libs/axios';
import { useMutation, useQuery } from 'react-query';
import { ITransactions } from '@shared/transaction.type';
import { AxiosErrorResponseData, AxiosResponseData } from '@/libs/axios.types';
import { AxiosError } from 'axios';
import { notifications } from '@mantine/notifications';

export const usePostTransaction = () => {
  return useMutation(
    async (params: ITransactions) => {
      return await axios.post<
        AxiosResponseData<any>,
        AxiosError<AxiosErrorResponseData>,
        ITransactions
      >('/transactions', params);
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
        AxiosResponseData<any>,
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
  return useQuery(
    ['transactions'],
    async () => {
      return await axios.get('/transactions');
    },
    {
      onError: () => {
        return notifications.show({
          message: 'Something went wrong',
          color: 'red',
        });
      },
    },
  );
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
