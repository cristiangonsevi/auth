import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { LoginResponse } from '../interfaces/responses/loginResponse.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _sweetAlert: SweetAlertService,
    private _localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
  }
  initLoginForm() {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
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
    this._localStorage.setItem('currenDatatUser', data.data);
    this._sweetAlert.toast({
      title: 'Welcome again',
      text: data.data.firstName + ' ' + data.data.lastName,
      icon: 'success',
    });
  }
}
