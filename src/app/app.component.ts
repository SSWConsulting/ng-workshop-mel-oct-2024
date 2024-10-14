import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CompanyListComponent } from "./company/company-list/company-list.component";

@Component({
  selector: 'fbc-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CompanyListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Melbourne Angular Workshop';
}
