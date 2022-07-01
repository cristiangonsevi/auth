import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SweetAlertService } from '../services/sweet-alert.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _sweetAlert: SweetAlertService
  ) {}
  canActivate(): boolean {
    const user = localStorage.getItem('currentDataUser');
    if (!user) {
      this._sweetAlert.toast({
        title: 'You must be logged in',
        icon: 'error',
      });
      this._router.navigate(['/auth/login']);
      return true;
    }
    return true;
  }
}
