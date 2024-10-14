import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Company } from '../company';

@Component({
  selector: 'fbc-company-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss'
})
export class CompanyListComponent {
  companies: Company[] = [];

  ngOnInit(): void {
    this.companies = [
      { name: 'Company 1', email: 'email1@company.com', phone: '1234567890' },
      { name: 'Company 2', email: 'email2 @company.com', phone: '1234567890' },
      { name: 'Company 3', email: 'email3@company.com', phone: '1234567890' },
    ];
  }

}
