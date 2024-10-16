import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { Company } from './company';
import { ToastService } from '../toast.service';
import { environment } from '../../environments/environment';
import { AppConfigService } from '../appconfig.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private appConfigService = inject(AppConfigService);
  private httpClient = inject(HttpClient);
  private toastService = inject(ToastService);

  private readonly API_BASE = 'https://app-fbc-crm-api-prod.azurewebsites.net/api';

  getCompanies(): Observable<Company[]> {
    return this.httpClient
    .get<Company[]>(`${this.API_BASE}/company`)
    .pipe(
      tap(_ => console.log('loadCompanies called')),
      catchError((err) => this.handleError<Company[]>(this.toastService, err)),
    )
  }

  getCompany(companyId: number): Observable<Company> {
    return this.httpClient
      .get<Company>(`${this.API_BASE}/company/${companyId}`)
      .pipe(
        catchError((err) => this.handleError<Company>(this.toastService, err)),
      );
  }

  addCompany(company: Company): Observable<Company> {
    return this.httpClient
      .post<Company>(`${this.API_BASE}/company`, { ...company, id: 0 })
      .pipe(
        catchError((err) => this.handleError<Company>(this.toastService, err)),
        tap(company => this.toastService.showSuccess(`${company.name} added successfully`)),
      );
  }

  updateCompany(company: Company): Observable<Company> {
    return this.httpClient
      .put<Company>(`${this.API_BASE}/company/${company.id}`, company)
      .pipe(
        catchError((err) => this.handleError<Company>(this.toastService, err)),
        tap(company => this.toastService.showSuccess(`${company.name} updated successfully`)),
      );
  }

  deleteCompany(companyId: number): Observable<Company> {
    return this.httpClient
      .delete<Company>(`${this.API_BASE}/company/${companyId}`)
      .pipe(
        catchError((err) => this.handleError<Company>(this.toastService, err)),
        tap(company => this.toastService.showSuccess(`${company.name} deleted successfully`)),
      );
  }

  private handleError<T>(
    toastService: ToastService,
    error: Error,
  ): Observable<T> {
    toastService.showError(error.message);
    return new Observable<T>();
  }
}
