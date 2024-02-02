import { axios } from '@/libs/axios';
import { useMutation } from 'react-query';
import { ITransactions } from '@shared/transaction.type';

export const usePostTransaction = () => {
  return useMutation(
    async (param: ITransactions) => {
      return await axios.post('/transaction', param);
    },
    {
      onSuccess: () => {},

      onError: () => {},
    },
  );
};

export const useGetTransactions = () => {};
export const useGetTransaction = () => {};

export const usePutTransaction = () => {
  return useMutation(
    async (param: ITransactions) => {
      return await axios.put('/transaction', param);
    },
    {
      onSuccess: () => {},

      onError: () => {},
    },
  );
};

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
