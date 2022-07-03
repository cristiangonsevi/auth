import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { LOGINSUCCESSACTION, LOGOUTREQUESTACTION } from './auth.actions';
import * as authState from './auth.state';

export const initialLoginState: authState.LoginState = {
  isLoggedIn: false,
  user: null,
  error: null,
};
const _loginReducer = createReducer(
  initialLoginState,
  on(LOGINSUCCESSACTION, (state, payload) => ({
    ...state,
    isLoggedIn: true,
    user: payload.loginSuccessResponse.data,
  })),
  on(LOGOUTREQUESTACTION, (state) => ({
    ...state,
    isLoggedIn: false,
    user: null,
  }))
);

export function loginReducer(state: any, action: any) {
  return _loginReducer(state, action);
}

const selectLoginState = createFeatureSelector<authState.LoginState>('auth');
export const getIsLoggedIn = createSelector(
  selectLoginState,
  (state) => state.isLoggedIn
);
