// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import Material from '@primeuix/themes/material';
import { tokenApiInterceptor } from './core/interceptors/token-api-interceptor';
import { responseApiInterceptor } from './core/interceptors/response-api-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch(), withInterceptors([tokenApiInterceptor, responseApiInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: Material,
        options: {
          darkModeSelector: '.my-app-dark',
          semantic: {
            colorScheme: {
              light: { 
                highlight: {
                  background: '{primary.50}',
                  color: '{primary.700}',
                },
              },
              dark: {
                highlight: {
                  background: '{primary.200}',
                  color: '{primary.900}',
                },
              },
            },
          },
        },
      },
    }),
  ],
};
