import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';

export const authorizationGuard: CanActivateFn = (route, state) => {
  const authorizationService = inject(AuthorizationService);
  const router = inject(Router);

  if (authorizationService.isAuthenticated()) {
    return true;
  }

  router.navigate(['auth/login']);
  return false;
};
