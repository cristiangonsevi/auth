import { Injectable } from '@angular/core';
import { UserLoggedIn } from '../interfaces/userLoggedIn.interface';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _localStorageService: LocalStorageService) {}
  getUserLoggedIn(): UserLoggedIn {
    return this._localStorageService.getItem('currenDatatUser');
  }
}
