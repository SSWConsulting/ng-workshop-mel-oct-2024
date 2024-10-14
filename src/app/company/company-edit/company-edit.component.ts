import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Company } from '../company';

type CompanyEditFormGroup = {
  [K in keyof Company]: FormControl<Company[K] | null>;
}

@Component({
  selector: 'fbc-company-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './company-edit.component.html',
  styleUrl: './company-edit.component.scss',
})
export class CompanyEditComponent {
  companyForm!: FormGroup<CompanyEditFormGroup>;

  ngOnInit(): void {
    this.companyForm = new FormGroup<CompanyEditFormGroup>({
      id: new FormControl(null),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl(''),
    });
  }

  saveCompany() {
    this.companyForm.markAllAsTouched();
  }
}
