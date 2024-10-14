import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Company } from '../company';
import { CompanyService } from '../company.service';
import { Router } from '@angular/router';

type CompanyEditFormGroup = {
  [K in keyof Company]: FormControl<Company[K] | null>;
};

@Component({
  selector: 'fbc-company-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './company-edit.component.html',
  styleUrl: './company-edit.component.scss',
})
export class CompanyEditComponent {
  companyForm!: FormGroup<CompanyEditFormGroup>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly companyService: CompanyService,
  ) {}

  ngOnInit(): void {
    this.companyForm = this.fb.group<CompanyEditFormGroup>({
      id: this.fb.control(0),
      name: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      phone: this.fb.control(''),
    });
  }

  saveCompany() {
    this.companyForm.markAllAsTouched();

    if (this.companyForm.valid) {
      const company = this.companyForm.value as Company;
      this.companyService.addCompany(company).subscribe((_) => {
        this.router.navigate(['/company/list']);
      });
    }
  }
}
