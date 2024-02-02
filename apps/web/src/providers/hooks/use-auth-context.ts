import { useContext } from 'react';
import { AuthContext, AuthDispatchContext } from '../auth.provider';

export const useAuth = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return auth;
};
export const useAuthDispatch = () => {
  const auth = useContext(AuthDispatchContext);

  if (!auth) {
    throw new Error('useAuthDispatch must be used within an AuthProvider');
  }
  return auth;
};
