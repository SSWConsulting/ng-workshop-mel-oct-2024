import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Company } from './company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private readonly API_BASE = 'https://app-fbc-crm-api-prod.azurewebsites.net/api';

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(`${this.API_BASE}/company`).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: any): Observable<Company[]> {
    console.error('Failed to get companies', error);
    return new Observable<Company[]>();
  }
}
