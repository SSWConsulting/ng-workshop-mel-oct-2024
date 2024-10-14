import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Company } from '../company';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'fbc-company-table',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './company-table.component.html',
  styleUrl: './company-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyTableComponent implements OnChanges {
  @Input()
  companies: Company[] = [];

  @Output()
  companyDeleted = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges): void {
    console.log('CompanyTableComponent - ngOnChanges', changes);
  }

  deleteCompany(companyId: number): void {
    this.companyDeleted.emit(companyId);
  }
}
