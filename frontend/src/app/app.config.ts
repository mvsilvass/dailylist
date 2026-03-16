import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { authInterceptor } from '@core/interceptors/auth-interceptor';

registerLocaleData(localePt);
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideBrowserGlobalErrorListeners(),
    provideNativeDateAdapter(),
    provideRouter(routes),

    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
};
