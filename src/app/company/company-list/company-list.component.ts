import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../company';
import { CompanyService } from '../company.service';

@Component({
  selector: 'fbc-company-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss'
})
export class CompanyListComponent {

  companies$!: Observable<Company[]>;

  constructor(
    private readonly companyService: CompanyService
  ) {
  }

  ngOnInit(): void {
    this.companies$ = this.companyService.getCompanies();
  }

  deleteCompany(companyId: number): void {
    this.companyService.deleteCompany(companyId).subscribe(_ => {
      this.companies$ = this.companyService.getCompanies();
    });
  }

}
