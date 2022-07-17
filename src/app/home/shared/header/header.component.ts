import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/interfaces/user.model';
import { UserService } from 'src/app/services/user.service';
import { getImage } from 'src/app/state/profile/profile.reducers';
import { environment } from 'src/environments/environment';
import * as authAction from '../../../state/auth/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentUser!: User;
  toggleMenu: boolean = false;
  host = environment;
  imgUploaded: Observable<string | null> = new Observable();
  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this._eRef.nativeElement.contains(event.target)) {
      this.toggleMenu = false;
    }
  }
  constructor(
    private _eRef: ElementRef,
    private _userService: UserService,
    private _store: Store
  ) {}
  ngOnInit(): void {
    this.currentUser = this._userService.getUserLoggedIn();
    this.imgUploaded = this._store.select(getImage)
  }
  logout() {
    this._store.dispatch(authAction.LOGOUTREQUESTACTION());
  }
}
