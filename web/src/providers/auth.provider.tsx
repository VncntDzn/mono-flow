import { ChildrenProps } from '@/types';
import { Reducer, createContext, useReducer } from 'react';
import { AuthActionType } from './auth.enums';

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
  const [auth, dispatch] = useReducer<Reducer<IState, IAuthAction>>(authReducer, initialState);
  return (
    <AuthContext.Provider value={auth}>
      <AuthDispatchContext.Provider value={dispatch as unknown as IAuthAction}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};
