import { User } from '@/entities/user.entity';

type PickedUser = Pick<User, 'first_name' | 'last_name' | 'user_id'>;

export interface ISigninWithToken extends PickedUser {
  access_token: string;
}
