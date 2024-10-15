import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'company/list' },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'company',
    children: [
      {
        path: 'list',
        loadComponent: () =>
          import('./company/company-list/company-list.component').then(
            (m) => m.CompanyListComponent,
          ),
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./company/company-edit/company-edit.component').then(
            (m) => m.CompanyEditComponent,
          ),
      },
      {
        path: 'add',
        loadComponent: () =>
          import('./company/company-edit/company-edit.component').then(
            (m) => m.CompanyEditComponent,
          ),
      },
    ],
  },
];
