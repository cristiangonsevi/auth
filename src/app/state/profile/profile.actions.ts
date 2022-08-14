import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/auth/interfaces/user.model';

const REQUESTCHANGEIMAGE = '[Profile] Request change Image';
const SUCCESSCHANGEIMAGE = '[Profile] Success change Image';
const GETNEWIMAGE = '[Profile] Get new image';
const REQUESTCHANGEUSERDATA = '[Profile] Request change user data';
const SUCCESSCHANGEUSERDATA = '[Profile] Success change user data';
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
export const CHANGEUSERDATAREQUESTACTION = createAction(
  REQUESTCHANGEUSERDATA,
  props<{ userId: number; user: User }>()
);
export const CHANGEUSERDATASUCCESSACTION = createAction(
  SUCCESSCHANGEUSERDATA,
  props<{ user: { data: User } }>()
);
