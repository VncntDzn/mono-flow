import { ChildrenProps } from '@/types';
import localforage from 'localforage';
import { Reducer, createContext, useEffect, useReducer } from 'react';
import { AuthActionType } from './auth.enums';
import { useSignin } from '@/features/auth/hooks/use-auth';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext<IState | null>(null);
export const AuthDispatchContext = createContext<IAuthAction | null>(null);

interface IAuthAction {
  type: string;
  payload: {
    [key in string]: unknown;
  };
}

interface IState {
  isLoggedIn: boolean;
  access_token: string | null;
  isLoading: boolean;
}
const initialState: IState = {
  isLoggedIn: false,
  access_token: null,
  isLoading: false,
};

function authReducer(state: IState, actions: IAuthAction) {
  switch (actions.type) {
    case AuthActionType.SIGNIN: {
      return {
        ...state,
        access_token: actions.payload.access_token,
        isLoading: actions.payload.isLoading,
        isLoggedIn: actions.payload.isLoggedIn,
      };
    }
    case AuthActionType.SIGNOUT: {
      return {
        ...state,
        access_token: null,
        isLoading: false,
        isLoggedIn: false,
      };
    }

    default: {
      return state;
    }
  }
}
export const AuthProvider = ({ children }: ChildrenProps) => {
  const { isLoading } = useSignin();
  const [auth, dispatch] = useReducer<Reducer<IState, IAuthAction>>(
    authReducer,
    initialState,
  );

  useEffect(() => {
    (async function retrieveAccessToken() {
      try {
        const { isLoggedIn, access_token } = await localforage.getItem('auth');

        if (!isLoading) {
          dispatch({
            type: AuthActionType.SIGNIN,
            payload: { isLoggedIn, isLoading, access_token },
          });
        }
      } catch (error) {
        console.info('No token found');
      }
    })();
  }, [isLoading]);

  return (
    <AuthContext.Provider value={auth}>
      <AuthDispatchContext.Provider value={dispatch as unknown as IAuthAction}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};
