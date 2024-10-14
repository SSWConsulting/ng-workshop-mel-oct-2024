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
import { ActivatedRoute, Router } from '@angular/router';

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
  isNewCompany = false;
  companyForm!: FormGroup<CompanyEditFormGroup>;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly companyService: CompanyService,
  ) {}

  ngOnInit(): void {
    const companyId = +this.activatedRoute.snapshot.params['id'];
    this.isNewCompany = !(companyId > 0);

    this.companyForm = this.fb.group<CompanyEditFormGroup>({
      id: this.fb.control(0),
      name: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      phone: this.fb.control(''),
    });

    if (!this.isNewCompany) {
      // TODO: load company and patch form
    }
  }

  saveCompany() {
    this.companyForm.markAllAsTouched();

    if (!this.companyForm.valid) {
      return;
    }

    const company = this.companyForm.value as Company;

    if (this.isNewCompany) {
      this.companyService.addCompany(company).subscribe((_) => {
        this.router.navigate(['/company/list']);
      });
    } else {
      throw new Error('Not implemented');
    }
  }
}
