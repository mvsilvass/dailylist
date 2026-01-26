import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SessionService } from '@core/services/session.service';

export const loginGuard: CanActivateFn = () => {
  const sessionService = inject(SessionService);
  const router = inject(Router);

  if (sessionService.isAuthenticated()) {
    router.navigate(['/home']);
    return false;
  }

  return true;
};
