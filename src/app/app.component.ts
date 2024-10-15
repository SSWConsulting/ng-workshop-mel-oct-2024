import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastComponent } from './toast/toast.component';
import { CompanyService } from './company/company.service';
import { map } from 'rxjs';
import { environment } from '../environments/environment';
import { Store } from '@ngrx/store';
import { selectCompanyCount } from './+state/company.selectors';
import { CompanyActions } from './+state/company.actions';

@Component({
  selector: 'fbc-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Melbourne Angular Workshop';
  store = inject(Store);
  companyCount$ = this.store.select(selectCompanyCount);
  environmentName = environment.name;

  ngOnInit() {
    this.store.dispatch(CompanyActions.loadCompanies());
  }
}
