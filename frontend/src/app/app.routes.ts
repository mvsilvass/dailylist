import { Routes } from '@angular/router';

import { Login } from './authentication/login/login';
import { Home } from './features/home/home';

export const routes: Routes = [
  {
    title: 'DailyList - Home',
    path: 'home',
    component: Home,
  },
  {
    title: 'DailyList - Login',
    path: 'auth/login',
    component: Login,
  },
];
