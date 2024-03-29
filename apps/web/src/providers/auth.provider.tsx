import { ChildrenProps } from '@/types';
import { Reducer, createContext, useEffect, useReducer, useState } from 'react';
import { AuthActionType } from './auth.enums';

import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';
export const AuthContext = createContext<IState | null>(null);
export const AuthDispatchContext = createContext<IAuthAction | null>(null);

interface IAuthAction<T = null> {
  type: AuthActionType;
  payload: {
    [key in string]: T;
  };
}

interface IState {
  access_token: string | null;
}
const initialState: IState = {
  access_token: null,
};

function authReducer(state: IState, actions: IAuthAction) {
  switch (actions.type) {
    case AuthActionType.SIGNIN: {
      return {
        ...state,
        access_token: actions.payload.access_token,
      };
    }
    case AuthActionType.SIGNOUT: {
      return {
        ...state,
        access_token: null,
      };
    }

    default: {
      return state;
    }
  }
}
export const AuthProvider = ({ children }: ChildrenProps) => {
  const [isExpired, setIsExpired] = useState(false);
  const access_token = localStorage.getItem('access_token');
  const [auth, dispatch] = useReducer<Reducer<IState, IAuthAction>>(
    authReducer,
    initialState,
  );
  useEffect(() => {
    if (access_token) {
      const exp = jwtDecode(access_token).exp! * 1000;
      const formattedExp = dayjs(exp).format('YYYY-MM-DD HH:mm:ss');
      const CURRENT_DATE = dayjs().format('YYYY-MM-DD HH:mm:ss');

      setIsExpired(dayjs(CURRENT_DATE).isAfter(formattedExp));
    }
  }, [access_token]);

  useEffect(() => {
    if (isExpired) {
      localStorage.clear();
    }
  }, [isExpired]);
  return (
    <AuthContext.Provider value={auth}>
      <AuthDispatchContext.Provider value={dispatch as unknown as IAuthAction}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};
