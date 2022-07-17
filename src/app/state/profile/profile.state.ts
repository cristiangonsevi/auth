import { User } from 'src/app/auth/interfaces/user.model';

export interface ProfileState {
  user: User | null;
  isUploadingImg: boolean;
  image: string | null;
}
