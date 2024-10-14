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
      catchError(this.handleError<Company[]>)
    );
  }

  getCompany(companyId: number): Observable<Company> {
    return this.httpClient.get<Company>(`${this.API_BASE}/company/${companyId}`).pipe(
      catchError(this.handleError<Company>)
    );
  }

  addCompany(company: Company): Observable<Company> {
    return this.httpClient.post<Company>(`${this.API_BASE}/company`, company).pipe(
      catchError(this.handleError<Company>)
    );
  }

  updateCompany(company: Company): Observable<Company> {
    return this.httpClient.put<Company>(`${this.API_BASE}/company/${company.id}`, company).pipe(
      catchError(this.handleError<Company>)
    );
  }

  deleteCompany(companyId: number): Observable<Company> {
    return this.httpClient.delete<Company>(`${this.API_BASE}/company/${companyId}`).pipe(
      catchError(this.handleError<Company>)
    );
  }

  private handleError<T>(error: any): Observable<T> {
    console.error('Failed to get companies', error);
    return new Observable<T>();
  }
}
