import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastComponent } from "./toast/toast.component";
import { CompanyService } from './company/company.service';

@Component({
  selector: 'fbc-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Melbourne Angular Workshop';
  companiesService = inject(CompanyService);
  companies$ = this.companiesService.getCompanies();
}
