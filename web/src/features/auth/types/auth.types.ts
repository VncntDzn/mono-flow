export interface ISignup {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export type ISignin = Omit<ISignup, 'first_name' | 'last_name'>;
