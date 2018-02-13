import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './views/users/login/login.component';
import {ProfileComponent} from './views/users/profile/profile.component';
import {RegisterComponent} from './views/users/register/register.component';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile/:userId', component: ProfileComponent}
];

export const routing = RouterModule.forRoot(appRoutes);
