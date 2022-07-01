import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserLoggedIn } from '../interfaces/userLoggedIn.interface';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.api.url;
  constructor(
    private _localStorageService: LocalStorageService,
    private _http: HttpClient
  ) {}
  getUserLoggedIn(): UserLoggedIn {
    return this._localStorageService.getItem('currentDataUser');
  }
  removeUser(): void {
    localStorage.removeItem('currentDataUser');
    this._localStorageService.deleteItem('currentDataUser');
  }
  updateUserData(data: any, id: number) {
    return this._http.put(`${this.baseUrl}/user/${id}`, data);
  }
  updatedUserImage(data: any, id: number) {
    return this._http.post(`${this.baseUrl}/user/${id}/image`, data);
  }
  updateUserPassword(data: any, id: number) {
    return this._http.put(`${this.baseUrl}/user/${id}/password`, data);
  }
}
