import { axios } from '@/libs/axios';
import { AxiosErrorResponseData } from '@/libs/axios.types';
import { readLocalStorageValue } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IWallet } from '@shared/wallet.type';
import { AxiosError } from 'axios';
import { useMutation, useQuery } from 'react-query';

interface WalletResponse {
  message: string;
  statusCode: number;
}

export const usePostWallet = () => {
  const user_id: string = readLocalStorageValue({ key: 'user_id' });
  return useMutation(
    async (params: IWallet) => {
      return await axios.post<
        WalletResponse,
        AxiosError<AxiosErrorResponseData>,
        IWallet
      >('/wallets', {
        ...params,
        user_id,
      });
    },
    {
      onSuccess: async (data) => {
        notifications.show({
          title: 'Wallet',
          message: data.message,
          autoClose: 3000,
          color: 'green',
        });
        return data;
      },

      onError: (err: AxiosError) => {
        notifications.show({
          title: 'Wallet',
          message: err.status !== 404 ? 'Something went wrong' : err.message,
          autoClose: 3000,
          color: 'red',
        });
      },
    },
  );
};

export const useGetWallets = () => {
  const user_id = readLocalStorageValue({ key: 'user_id' });
  return useQuery(['wallets'], async () => {
    return await axios.get(`/wallets/${user_id}`);
  });
};
