import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
  // private readonly companyService = inject(CompanyService);

  companies: Company[] = [];

  constructor(
    private readonly companyService: CompanyService
  ) {
  }

  ngOnInit(): void {
    // this.companies = this.companyService.getCompanies();

    this.companyService.getCompanies().subscribe(companies => {
      this.companies = companies;
    });
  }

}
