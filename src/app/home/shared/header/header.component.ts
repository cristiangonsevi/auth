import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user.model';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentUser!: User;
  toggleMenu: boolean = false;
  host = environment

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this._eRef.nativeElement.contains(event.target)) {
      this.toggleMenu = false;
    }
  }
  constructor(
    private _eRef: ElementRef,
    private _userService: UserService,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this.currentUser = this._userService.getUserLoggedIn();
  }
  logout() {
    this._userService.removeUser();
    this._router.navigate(['/auth/login']);
  }
}
