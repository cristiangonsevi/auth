import { createAction, props } from '@ngrx/store';
import { LoginResponse } from 'src/app/auth/interfaces/responses/loginResponse.model';
import { User } from 'src/app/auth/interfaces/user.model';
import { ErrorResponse } from 'src/app/core/interfaces/errorResponse.interface';

export const LOGINREQUEST = '[Auth] Login Request';
export const LOGINSUCCESS = '[Auth] Login Success';
export const LOGINFAILURE = '[Auth] Login Failure';

export const LOGINREQUESTACTION = createAction(
  LOGINREQUEST,
  props<{ credentials: { email: string; password: string } }>()
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
