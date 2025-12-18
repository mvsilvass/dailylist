import { Routes } from '@angular/router';
import { Home } from './features/public/pages/home/home';
import { Login } from './features/authentication/pages/login/login';
import { Register } from './features/authentication/pages/register/register';
import { authorizationGuard } from './core/guards/authorization-guard';

export const routes: Routes = [
  {
    title: 'DailyList - Home',
    path: '',
    component: Home,
  },
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
  {
    title: 'DailyList - Register',
    path: 'auth/register',
    component: Register,
  },
  {
    title: 'DailyList',
    path: 'teste',
    component: Home,
    canActivate: [authorizationGuard],
  },
];

