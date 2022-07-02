import { User } from 'src/app/auth/interfaces/user.model';

export interface LoginState {
  isLoggedIn: boolean;
  user: Readonly<User> | null;
  error: string | null;
}
