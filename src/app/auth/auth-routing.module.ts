import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const router: Routes = [
  {
    path: '',
    children: [
      {
        path: 'register',
        component: RegisterComponent,
        title: 'Sign up and enjoy'
      },
      {
        path: 'login',
        component: LoginComponent,
        title: 'Sign In to your account'
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(router)],
})
export class AuthRoutingModule {}
