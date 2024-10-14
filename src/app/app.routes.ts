import { Routes } from '@angular/router';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'company/list' },
  {
    path: 'company',
    children: [
      { path: 'list', component: CompanyListComponent },
      { path: 'edit/:id', component: CompanyEditComponent },
      { path: 'add', component: CompanyEditComponent },
    ],
  },
];
