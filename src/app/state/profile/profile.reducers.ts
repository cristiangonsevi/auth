import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import {
  CHANGEIMAGEREQUESTACTION,
  CHANGEIMAGESUCCESSACTION,
  GETNEWIMAGEACTION,
} from './profile.actions';
import { ProfileState } from './profile.state';

const initialProfileState: ProfileState = {
  user: null,
  image: null,
  isUploadingImg: false,
};

const _profileReducer = createReducer(
  initialProfileState,
  on(CHANGEIMAGEREQUESTACTION, (state) => ({
    ...state,
    isUploadingImg: true,
  })),
  on(CHANGEIMAGESUCCESSACTION, (state, { image }) => ({
    ...state,
    image: image.file.filename,
    isUploadingImg: false,
  })),
  on(GETNEWIMAGEACTION, (state) => ({
    ...state,
  }))
);

export function profileReducer(state: any, action: any) {
  return _profileReducer(state, action);
}
const selectProfileState = createFeatureSelector<ProfileState>('profile');
export const getIsLoadingImg = createSelector(
  selectProfileState,
  (state) => state.isUploadingImg
);
export const getImage = createSelector(
  selectProfileState,
  (state) => state.image
);
export const getUser = createSelector(
  selectProfileState,
  (state) => state.user
);
