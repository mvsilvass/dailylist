import { Routes } from '@angular/router';
import { Home } from './features/public/pages/home/home';
import { Login } from './features/auth/pages/login/login';


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
