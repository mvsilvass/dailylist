import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '@core/services/local-storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storage = inject(LocalStorageService);
  const accessToken = storage.get('access_token');

  if (accessToken) {
    const reqWithHeader = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
    });

    return next(reqWithHeader);
  }

  return next(req);
};
