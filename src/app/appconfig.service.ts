import { Injectable } from '@angular/core';
import { take, tap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  public API_BASE = '';

  loadAppConfig() {
    this.API_BASE = 'https://app-fbc-crm-api-prod.azurewebsites.net/api';
  }
}
