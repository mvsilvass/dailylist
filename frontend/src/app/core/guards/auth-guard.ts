import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '@core/services/session.service';

export const authGuard: CanActivateFn = (route, state) => {
  const sessionService = inject(SessionService);
  const router = inject(Router);

  if (!sessionService.isAuthenticated()) {
    router.navigate(['/auth/login']);
    return false;
  }

  const requiredRole = route.data?.['role'] as string | undefined;

  if (requiredRole && !sessionService.hasRole(requiredRole)) {
    router.navigate(['/auth/login']);
    return false;
  }

  return true;
};
