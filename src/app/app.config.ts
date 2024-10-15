import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideZoneChangeDetection, isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { AppConfigService } from './appconfig.service';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { effects, reducers, metaReducers } from './+state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideEnvironmentNgxMask(),
    // {
    //     provide: APP_INITIALIZER,
    //     useFactory: initializeApp,
    //     deps: [AppConfigService],
    //     multi: true,
    // },
    provideStore(reducers, { metaReducers }),
    provideEffects(effects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
],
};

export function initializeApp(appConfigService: AppConfigService) {
  return () => appConfigService.loadAppConfig();
}
