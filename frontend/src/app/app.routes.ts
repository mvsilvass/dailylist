import { Routes } from '@angular/router';
import { Home } from './features/public/pages/home/home';
import { Login } from './features/auth/pages/login/login';
import { Register } from './features/auth/pages/register/register';


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
  {
    title: 'DailyList - Register',
    path: 'auth/register',
    component: Register,
  },
];

