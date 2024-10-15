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
import { Observable } from 'rxjs';
import { NgxMaskDirective } from 'ngx-mask';

type CompanyEditFormGroup = {
  [K in keyof Company]: FormControl<Company[K] | null>;
} & {
  checkPhone: FormControl<boolean | null>;
};

@Component({
  selector: 'fbc-company-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective],
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
      checkPhone: this.fb.control(false),
      phone: this.fb.control({ value: '', disabled: true }),
    });

    this.companyForm.controls.checkPhone.valueChanges.subscribe((v) => {
      const phoneControl = this.companyForm.controls.phone;
      if (v) {
        phoneControl.setValidators([Validators.required]);
        phoneControl.enable();
      } else {
        phoneControl.clearValidators();
        phoneControl.disable();
      }
      phoneControl.updateValueAndValidity();
    });

    if (!this.isNewCompany) {
      this.companyService.getCompany(companyId).subscribe((company) => {
        this.companyForm.patchValue(company);
      });
    }
  }

  saveCompany(): void {


    this.companyForm.markAllAsTouched();

    // const companyValue = this.companyForm.value;
    // const formIsValid = this.companyForm.valid;
    const {
      value: companyValue,
      valid: formIsValid
    } = this.companyForm;

    const company = companyValue as Company;
    console.log('Company:', company);

    if (!formIsValid) {
      return;
    }

    let companySaveObservable: Observable<Company>;

    if (this.isNewCompany) {
      companySaveObservable = this.companyService.addCompany(company);
    } else {
      companySaveObservable = this.companyService.updateCompany(company);
    }

    companySaveObservable.subscribe((_) => {
      this.router.navigate(['/company/list']);
    });
  }
}
