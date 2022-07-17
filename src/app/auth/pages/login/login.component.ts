import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { environment } from 'src/environments/environment';
import * as authAction from '../../../state/auth/auth.actions';
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
    private _sweetAlert: SweetAlertService,
    private _activatedRoute: ActivatedRoute,
    private _ngZone: NgZone,
    private _store: Store
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
      this._store.dispatch(
        authAction.LOGINSUCCESSACTION({ loginSuccessResponse: data })
      );
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
      { theme: 'outline', size: 'medium' }
    );
  }
  customLoginMethod(token: any) {
    this._store.dispatch(authAction.LOGINGOOGLEREQUESTACTION({ token }));
  }
  onSubmit(): any {
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
    this._store.dispatch(
      authAction.LOGINREQUESTACTION({ credentials: this.loginForm.value })
    );
  }
}
