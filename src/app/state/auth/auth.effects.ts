import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { SignInType } from 'src/app/auth/enums/signInType.enum';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import * as authActions from './auth.actions';

@Injectable()
export class AuthEffects {
  loginRequest$ = createEffect(() =>
    this._actions$.pipe(
      ofType(authActions.LOGINREQUESTACTION),
      exhaustMap((action) => {
        return this._authService.loginWithEmail(action.credentials).pipe(
          map((loginSuccessResponse) =>
            authActions.LOGINSUCCESSACTION({ loginSuccessResponse })
          ),
          catchError((error) => of(authActions.LOGINFAILUREACTION({ error })))
        );
      })
    )
  );
  loginGoogleRequest$ = createEffect(() =>
    this._actions$.pipe(
      ofType(authActions.LOGINGOOGLEREQUESTACTION),
      exhaustMap((action) => {
        console.log('_________google signing', action.token);
        return this._authService
          .loginWithCustomAuth(action.token, SignInType.GOOGLE)
          .pipe(
            map((loginSuccessResponse) =>
              authActions.LOGINSUCCESSACTION({ loginSuccessResponse })
            ),
            catchError((error) => of(authActions.LOGINFAILUREACTION({ error })))
          );
      })
    )
  );
  loginSuccess$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(authActions.LOGINSUCCESSACTION),
        tap(({ loginSuccessResponse }) => {
          this._localStorage.setItem(
            'currentDataUser',
            loginSuccessResponse.data
          );
          this._router.navigate(['/home']);
          this._sweetAlert.toast({
            title: 'Welcome again',
            text:
              loginSuccessResponse.data.firstName +
              ' ' +
              loginSuccessResponse.data.lastName,
            icon: 'success',
          });
        })
      ),
    { dispatch: false }
  );
  loginFailure$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(authActions.LOGINFAILUREACTION),
        tap(({ error }) => {
          this._sweetAlert.toast({
            title: 'Error',
            text: error.error.message,
            icon: 'error',
          });
        })
      ),
    { dispatch: false }
  );
  logoutRequest$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(authActions.LOGOUTREQUESTACTION),
        tap(() => {
          this._localStorage.deleteItem('currentDataUser');
          this._router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private _actions$: Actions,
    private _authService: AuthService,
    private _sweetAlert: SweetAlertService,
    private _router: Router,
    private _localStorage: LocalStorageService
  ) {}
}
