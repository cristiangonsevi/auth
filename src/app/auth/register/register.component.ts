import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { environment } from 'src/environments/environment';
import { SignInType } from '../enums/signInType.enum';
import { AuthService } from '../services/auth.service';
declare const google: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  constructor(
    private _authService: AuthService,
    private _sweetAlert: SweetAlertService,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.renderGoogleBtn();
    this.initRegisterForm();
  }
  initRegisterForm() {
    this.registerForm = this._fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  renderGoogleBtn() {
    google.accounts.id.initialize({
      client_id: environment.oAuth.google.client_id,
      callback: (response: any) => {
        this.customRegisterMethod(response.credential);
      },
    });
    google.accounts.id.renderButton(
      document.getElementById('buttonDiv'),
      { theme: 'outline', size: 'medium' } // customization attributes
    );
  }
  registerWithEmail(): any {
    console.log(this.registerForm.value);
    if (this.registerForm.invalid) {
      Object.keys(this.registerForm.controls).forEach((key) => {
        if (this.registerForm.controls[key].invalid) {
          this.registerForm.controls[key].markAsTouched();
        }
      });
      return this._sweetAlert.toast({
        title: 'Error',
        text: 'Please fill all required fields',
        icon: 'error',
      });
    }
    this._authService.registerWithEmail(this.registerForm.value).subscribe({
      next: (data: any) => this.handleSignIn(data),
      error: (err: any) =>
        this._sweetAlert.toast({
          title: err.error.error + ' code: ' + err.error.statusCode,
          text: err.error.message,
          icon: 'error',
        }),
    });
  }
  handleSignIn(data: any) {
    this._sweetAlert.toast({
      title: 'Success',
      text: data.message,
      icon: 'success',
    });
  }
  customRegisterMethod(token: any) {
    this._authService?.registerCustomAuth(token, SignInType.GOOGLE).subscribe({
      next: (data: any) => this.handleCustomAuthSignIn(data),
      error: (err: any) =>
        this._sweetAlert.toast({
          title: err.error.error + ' code: ' + err.error.statusCode,
          text: err.error.message,
          icon: 'error',
        }),
    });
  }
  handleCustomAuthSignIn(data: any) {
    this._sweetAlert.toast({
      title: 'Success',
      text: data.message,
      icon: 'success',
    });
  }
}
