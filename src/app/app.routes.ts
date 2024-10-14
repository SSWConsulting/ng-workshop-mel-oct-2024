import { Routes } from '@angular/router';
import { CompanyListComponent } from './company/company-list/company-list.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'company/list' },
  {
    path: 'company',
    children: [{ path: 'list', component: CompanyListComponent }],
  },
];
