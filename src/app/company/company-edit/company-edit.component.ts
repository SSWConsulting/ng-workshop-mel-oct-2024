import { Component } from '@angular/core';
import { Company } from '../company';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'fbc-company-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './company-edit.component.html',
  styleUrl: './company-edit.component.scss',
})
export class CompanyEditComponent {
  companyForm!: FormGroup;

  ngOnInit(): void {
    this.companyForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl(''),
    });
  }

  saveCompany() {
    this.companyForm.markAllAsTouched();
  }
}
