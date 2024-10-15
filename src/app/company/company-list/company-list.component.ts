import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../company';
import { CompanyService } from '../company.service';
import { CompanyTableComponent } from '../company-table/company-table.component';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCompanies } from '../../+state/company.selectors';
import { CompanyActions } from '../../+state/company.actions';

@Component({
  selector: 'fbc-company-list',
  standalone: true,
  imports: [CommonModule, CompanyTableComponent, RouterLink],
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss',
})
export class CompanyListComponent {
  private readonly store = inject(Store);
  companies$ = this.store.select(selectCompanies)

  deleteCompany(companyId: number): void {
    this.store.dispatch(CompanyActions.deleteCompany({ id: companyId }));
  }
}
