import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginWithEmail } from '../interfaces/login.model';
import { RegisterWithEmail } from '../interfaces/registerWithEmail.model';
import { SignInType } from '../enums/signInType.enum';
import { Observable } from 'rxjs';
import { LoginResponse } from '../interfaces/responses/loginResponse.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.api.url;
  constructor(private _http: HttpClient) {}

  loginWithEmail(user: LoginWithEmail): Observable<LoginResponse> {
    return this._http.post<LoginResponse>(`${this.baseUrl}/login`, user);
  }
  loginWithCustomAuth(token: string, authMethod: SignInType): Observable<any> {
    return this._http.post(`${this.baseUrl}/login/${authMethod}`, { token });
  }
  registerWithEmail(user: RegisterWithEmail) {
    return this._http.post(`${this.baseUrl}/register`, user);
  }
  registerCustomAuth(token: string, authMethod: SignInType): Observable<any> {
    return this._http.post(`${this.baseUrl}/register/${authMethod}`, { token });
  }
}
