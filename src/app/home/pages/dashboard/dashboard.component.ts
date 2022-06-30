import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/interfaces/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  currentUser!: User;
  constructor(private _userService: UserService) {}

  ngOnInit(): void {
    this.currentUser = this._userService.getUserLoggedIn();
  }
}
