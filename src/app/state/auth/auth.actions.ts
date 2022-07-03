import { createAction, props } from '@ngrx/store';
import { LoginResponse } from 'src/app/auth/interfaces/responses/loginResponse.model';
import { User } from 'src/app/auth/interfaces/user.model';
import { ErrorResponse } from 'src/app/core/interfaces/errorResponse.interface';

export const LOGINREQUEST = '[Auth] Login Request';
export const LOGINGOOGLEREQUEST = '[Auth] Login Google Request';
export const LOGINGITHUBREQUEST = '[Auth] Login Github Request';
export const LOGINSUCCESS = '[Auth] Login Success';
export const LOGINFAILURE = '[Auth] Login Failure';
export const LOGOUTREQUEST = '[Auth] Logout Request';

export const LOGINREQUESTACTION = createAction(
  LOGINREQUEST,
  props<{ credentials: { email: string; password: string } }>()
);
export const LOGINGOOGLEREQUESTACTION = createAction(
  LOGINGOOGLEREQUEST,
  props<{ token: string }>()
);
export const LOGINSUCCESSACTION = createAction(
  LOGINSUCCESS,
  props<{ loginSuccessResponse: LoginResponse }>()
);
export const LOGINFAILUREACTION = createAction(
  LOGINFAILURE,
  props<{
    error: ErrorResponse;
  }>()
);
export const LOGOUTREQUESTACTION = createAction(LOGOUTREQUEST);
