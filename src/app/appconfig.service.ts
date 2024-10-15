import { Injectable } from '@angular/core';
import { take, tap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  public API_BASE = '';

  loadAppConfig() {
    return timer(2000)
      .pipe(
        take(1),
        tap((_) => {
          this.API_BASE = 'https://app-fbc-crm-api-prod.azurewebsites.net/api';
        }),
      )
      .toPromise()
      .then(as => {
        console.log('loadAppConfig done');
      });
  }
}
