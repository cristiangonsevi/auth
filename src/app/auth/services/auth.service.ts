import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginWithEmail } from '../interfaces/login.model';
import { RegisterWithEmail } from '../interfaces/registerWithEmail.model';
import { SignInType } from '../enums/signInType.enum';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.api.url;
  constructor(private _http: HttpClient) {}

  loginWithEmail(user: LoginWithEmail) {
    return this._http.post(`${this.baseUrl}/login`, user);
  }
  registerWithEmail(user: RegisterWithEmail) {
    return this._http.post(`${this.baseUrl}/register`, user);
  }
  registerCustomAuth(token: string, authMethod: SignInType): Observable<any> {
    return this._http.post(`${this.baseUrl}/register/${authMethod}`, { token });
  }
  as(){
    return 'sample'
  }
}
