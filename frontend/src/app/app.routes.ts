import { Routes } from '@angular/router';
import { loginGuard } from '@core/guards/login-guard';
import { TaskBoardPageComponent } from './features/tasks/pages/task-board-page/task-board-page.component';
import { authGuard } from '@core/guards/auth-guard';
import { LoginPageComponent } from './auth/pages/login/login-page.component';
import { RegisterPageComponent } from './auth/pages/register/register-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    title: 'DailyList - Login',
    path: 'auth/login',
    component: LoginPageComponent,
    canActivate: [loginGuard],
  },
  {
    title: 'DailyList - Register',
    path: 'auth/register',
    component: RegisterPageComponent,
  },
  {
    title: 'DailyList - My Calendar',
    path: 'tasks',
    component: TaskBoardPageComponent,
    canActivate: [authGuard],
  },
];
