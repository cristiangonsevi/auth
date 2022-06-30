import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { environment } from 'src/environments/environment';
import { SignInType } from '../../enums/signInType.enum';
import { LoginResponse } from '../../interfaces/responses/loginResponse.model';
import { AuthService } from '../../services/auth.service';
declare const google: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  githubOAuth = environment.oAuth.github;
  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _sweetAlert: SweetAlertService,
    private _localStorage: LocalStorageService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
    this.renderGoogleBtn();
    this.checkLoginByParamToken();
  }
  initLoginForm() {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  checkLoginByParamToken() {
    const token = this._activatedRoute.snapshot.queryParams['token'];
    if (!token) return;
    const data = JSON.parse(atob(token));
    if (data) {
      this._localStorage.setItem('currentDataUser', data.data);
      this.handleSignIn(data);
    }
  }
  renderGoogleBtn() {
    google.accounts.id.initialize({
      client_id: environment.oAuth.google.client_id,
      callback: (response: any) =>
        this._ngZone.run(() => {
          this.customLoginMethod(response.credential);
        }),
    });
    google.accounts.id.renderButton(
      document.getElementById('buttonDiv'),
      { theme: 'outline', size: 'medium' } // customization attributes
    );
  }
  customLoginMethod(token: any) {
    this._authService?.loginWithCustomAuth(token, SignInType.GOOGLE).subscribe({
      next: (data: any) => this.handleSignIn(data),
      error: (err: any) =>
        this._sweetAlert.toast({
          title: err.error.error + ' code: ' + err.error.statusCode,
          text: err.error.message,
          icon: 'error',
        }),
    });
  }
  onSubmit(): any {
    console.log(this.loginForm.value);
    if (this.loginForm.invalid) {
      Object.keys(this.loginForm.controls).forEach((key) => {
        if (this.loginForm.controls[key].invalid) {
          this.loginForm.controls[key].markAsTouched();
        }
      });
      return this._sweetAlert.toast({
        title: 'Error',
        text: 'Please fill all required fields',
        icon: 'error',
      });
    }
    this._authService.loginWithEmail(this.loginForm.value).subscribe({
      next: (data: LoginResponse) => this.handleSignIn(data),
      error: (err: any) =>
        this._sweetAlert.toast({
          title: 'Error',
          text: err.error.message,
          icon: 'error',
        }),
    });
  }
  handleSignIn(data: LoginResponse) {
    this._localStorage.setItem('currentDataUser', data.data);
    this._router.navigate(['/home']);
    this._sweetAlert.toast({
      title: 'Welcome again',
      text: data.data.firstName + ' ' + data.data.lastName,
      icon: 'success',
    });
  }
}
