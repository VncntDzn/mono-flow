import { axios } from '@/libs/axios';
import { useMutation } from 'react-query';
import { ISignup } from '../types/auth.types';
import { useNavigate } from 'react-router-dom';

export const useSignup = () => {
  const navigate = useNavigate();
  return useMutation(
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
        navigate('/dashboard')
      },
      onError: () => {
        console.log('Errorxx');
      },
    },
  );
};

export const useSignin = () => {};

export const useForgotPassword = () => {};
