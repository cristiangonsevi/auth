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
  constructor(private _router: Router, private _store: Store) {}
  canActivate(): boolean | Observable<boolean | UrlTree> {
    const user = localStorage.getItem('currentDataUser');
    if (!user) {
      this._router.navigate(['/auth/login']);
      return true;
    }
    return true;
  }
  ngOnDestroy(): void {}
}
