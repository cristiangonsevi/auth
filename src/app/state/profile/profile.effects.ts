import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { UserService } from 'src/app/services/user.service';
import {
  CHANGEIMAGEREQUESTACTION,
  CHANGEIMAGESUCCESSACTION,
  GETNEWIMAGEACTION,
} from './profile.actions';

@Injectable()
export class profileEffects {
  // @Effect()
  changeImageRequestAction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CHANGEIMAGEREQUESTACTION),
      exhaustMap((action) => {
        return this._userService
          .updatedUserImage(action.image, action.userId)
          .pipe(map((image: any) => CHANGEIMAGESUCCESSACTION({ image })));
      })
    )
  );

  changeImageSuccessAction$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CHANGEIMAGESUCCESSACTION),
        map((action) => {
          const currentUser = this._userService.getUserLoggedIn();
          currentUser.image = action.image.file.filename;
          this._localStorageService.setItem('currentDataUser', currentUser);
          this._sweetAlert.toast({
            title: 'Image updated successfully!',
            icon: 'success',
          });
        })
      ),
    { dispatch: false }
  );
  getImageAction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GETNEWIMAGEACTION),
      map((action) => {
        const currentUser = this._userService.getUserLoggedIn();
        return { ...action, user: currentUser };
      })
    )
  );

  constructor(
    private actions$: Actions,
    private _userService: UserService,
    private _sweetAlert: SweetAlertService,
    private _localStorageService: LocalStorageService
  ) {}
}
