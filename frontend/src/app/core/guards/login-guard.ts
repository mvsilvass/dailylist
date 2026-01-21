import { CanActivateFn, Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = () => {
  const authorizationService = inject(AuthorizationService);
  const router = inject(Router);

  if (authorizationService.isAuthenticated()) {
    router.navigate(['/home']);
    return false;
  }

  return true;
};
