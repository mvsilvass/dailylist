import { Routes } from '@angular/router';
import { Home } from './features/public/pages/home/home';
import { Login } from './features/authentication/pages/login/login';
import { Register } from './features/authentication/pages/register/register';
import { authorizationGuard } from './core/guards/authorization-guard';
import { loginGuard } from './core/guards/login-guard';
import { UserManagement } from './features/admin/pages/user-management/user-management';

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
    title: 'DailyList - Admin',
    path: 'admin',
    component: UserManagement,
    // canActivate: [authorizationGuard],
    // data: { role: 'ADMIN' },
  },
];

