import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Login } from './auth/pages/login/login';
import { Register } from './auth/pages/register/register';
import { loginGuard } from '@core/guards/login-guard';
import { TaskBoard } from './features/tasks/pages/task-board/task-board';

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
    title: 'DailyList - My Calendar',
    path: 'tasks',
    component: TaskBoard,
  },
];
