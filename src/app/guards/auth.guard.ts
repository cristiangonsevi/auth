import { Injectable, OnDestroy } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { SweetAlertService } from '../services/sweet-alert.service';
import * as authReducer from '../state/auth/auth.reducers';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, OnDestroy {
  isLoggedIn: Observable<boolean> = new Observable();
  constructor(
    private _router: Router,
    private _store: Store
  ) {}
  canActivate(): boolean | Observable<boolean | UrlTree>  {
    return this._store.select(authReducer.getIsLoggedIn).pipe(
      map((isLoggedIn) => {
        if (!isLoggedIn) {
          return this._router.createUrlTree(['/auth/login']);
        }
        return true;
      })
    );
  }
  ngOnDestroy(): void {}
}
