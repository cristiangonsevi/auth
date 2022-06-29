import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { User } from 'src/app/auth/interfaces/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentUser!: User;
  toggleMenu: boolean = false;

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this._eRef.nativeElement.contains(event.target)) {
      this.toggleMenu = false;
    }
  }
  constructor(private _eRef: ElementRef, private _userService: UserService) {}
  ngOnInit(): void {
    this.currentUser = this._userService.getUserLoggedIn();
  }
}
