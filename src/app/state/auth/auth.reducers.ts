import { createReducer, on } from '@ngrx/store';
import {  LOGINSUCCESSACTION } from './auth.actions';
import * as authState from './auth.state';

export const initialLoginState: authState.LoginState = {
  isLoggedIn: false,
  user: null,
  error: null,
};
export const loginReducer = createReducer(
  initialLoginState,
  on(LOGINSUCCESSACTION, (state, payload) => ({
    ...state,
    isLoggedIn: true,
    user: payload.loginSuccessResponse.data
  })),
);
