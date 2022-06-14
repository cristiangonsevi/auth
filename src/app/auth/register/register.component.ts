import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
declare const google: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('googleBtn') googleBtn!: ElementRef;
  constructor() {}

  ngOnInit(): void {
    this.renderGoogleBtn();
  }
  onSignInCallback(event: any) {
    console.log('sign in callback', event);
  }
  renderGoogleBtn() {
    google.accounts.id.initialize({
      client_id: environment.oAuth.google.client_id,
      callback: this.handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById('buttonDiv'),
      { theme: 'outline', size: 'small', with: '10px' } // customization attributes
    );
  }
  handleCredentialResponse(response: any) {
    console.log('Encoded JWT ID token: ' + response.credential);
  }
  openPopUpGoogle() {
    console.log('openPopUpGoogle');
    const btn: HTMLElement = this.googleBtn.nativeElement;
    btn.click();
  }
}
