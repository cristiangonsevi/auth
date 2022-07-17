import { ActionReducerMap } from '@ngrx/store';
import * as authState from './auth/auth.state';
import * as authReducer from './auth/auth.reducers';
import { AuthEffects } from './auth/auth.effects';
import { ProfileState } from './profile/profile.state';
import { profileReducer } from './profile/profile.reducers';
import { profileEffects } from './profile/profile.effects';
export interface AppState {
  auth: authState.LoginState;
  profile: ProfileState;
}
export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  auth: authReducer.loginReducer,
  profile: profileReducer,
};

export const ROOT_EFFECTS = [AuthEffects, profileEffects];
