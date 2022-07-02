import { ActionReducerMap } from '@ngrx/store';
import * as authState from './auth/auth.state';
import * as authReducer from './auth/auth.reducers';
export interface AppState {
  login: authState.LoginState;
}
export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  login: authReducer.loginReducer,
};
