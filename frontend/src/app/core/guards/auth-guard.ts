import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authorizationService = inject(AuthorizationService);
  const router = inject(Router);

  if (!authorizationService.isAuthenticated()) {
    router.navigate(['/auth/login']);
    return false;
  }

  const requiredRole = route.data?.['role'] as string | undefined;

  if (requiredRole && !authorizationService.hasRole(requiredRole)) {
    router.navigate(['/auth/login']);
    return false;
  }

  return true;
};
