import { Component, OnInit } from '@angular/core';
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
  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this.renderGoogleBtn();
    console.log('token', this._authService);
  }
  onSignInCallback(event: any) {
    console.log('sign in callback', event);
  }
  renderGoogleBtn() {
    const self = this;
    google.accounts.id.initialize({
      client_id: environment.oAuth.google.client_id,
      callback: (...args: any) => {
        console.log('google initialized', args);
        this.customRegisterMethod(args[0].credential);
      },
    });
    google.accounts.id.renderButton(
      document.getElementById('buttonDiv'),
      { theme: 'outline', size: 'small', with: '10px' } // customization attributes
    );
  }
  customRegisterMethod(token: any) {
    this._authService?.registerCustomAuth(token, SignInType.GOOGLE).subscribe({
      next: (data: any) => console.log(data),
      error: (err: any) => console.log(err),
    });
  }
}
