import { CanActivateFn, Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = () => {
  const authService = inject(AuthorizationService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    router.navigate(['/home']);
    return false;
  }

  return true;
};

