import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/interfaces/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  currentUser!: User;

  constructor(private _userService: UserService) {}

  ngOnInit(): void {
    this.currentUser = this._userService.getUserLoggedIn();
  }
}
