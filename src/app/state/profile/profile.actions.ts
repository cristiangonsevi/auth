import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/auth/interfaces/user.model';

const REQUESTCHANGEIMAGE = '[Profile] Request change Image';
const SUCCESSCHANGEIMAGE = '[Profile] Success change Image';
const GETNEWIMAGE = '[Profile] Get new image';
export const CHANGEIMAGEREQUESTACTION = createAction(
  REQUESTCHANGEIMAGE,
  props<{ image: FormData; userId: number }>()
);
export const CHANGEIMAGESUCCESSACTION = createAction(
  SUCCESSCHANGEIMAGE,
  props<{ image: { file: { filename: string } } }>()
);
export const GETNEWIMAGEACTION = createAction(
  GETNEWIMAGE,
  props<{ user: User }>()
);
