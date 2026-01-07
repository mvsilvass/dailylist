import { Routes } from '@angular/router';
import { Home } from './features/public/pages/home/home';
import { Login } from './features/authentication/pages/login/login';
import { Register } from './features/authentication/pages/register/register';
import { authorizationGuard } from './core/guards/authorization-guard';
import { loginGuard } from './core/guards/login-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
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
    canActivate: [loginGuard],
  },
  {
    title: 'DailyList - Register',
    path: 'auth/register',
    component: Register,
  },
  {
    title: 'ADMIN',
    path: 'admin',
    component: Home,
    // canActivate: [authorizationGuard],
    // data: { role: 'ADMIN' },
  },
];

