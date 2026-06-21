import { Routes } from '@angular/router';

import { loginGuard } from '@core/guards/login-guard';
import { authGuard } from '@core/guards/auth-guard';

import { TaskBoardComponent } from './features/tasks/pages/task-board.component';
import { RegisterComponent } from './auth/pages/register/register.component';
import { LoginComponent } from './auth/pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    title: 'DailyList - Login',
    path: 'auth/login',
    component: LoginComponent,
    canActivate: [loginGuard],
  },
  {
    title: 'DailyList - Register',
    path: 'auth/register',
    component: RegisterComponent,
  },
  {
    title: 'DailyList - My Calendar',
    path: 'tasks',
    component: TaskBoardComponent,
    canActivate: [authGuard],
  },
];
