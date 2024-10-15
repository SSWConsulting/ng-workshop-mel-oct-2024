import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CompanyTableComponent } from './company-table.component';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

describe('CompanyTableComponent', () => {
  let component: CompanyTableComponent;
  let fixture: ComponentFixture<CompanyTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CompanyTableComponent],
      providers: [provideRouter([])],
    });
    fixture = TestBed.createComponent(CompanyTableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should have 1 row per company', () => {
    component.companies = [
      { id: 1, name: '', email: '', phone: '' },
      { id: 2, name: '', email: '', phone: '' },
      { id: 3, name: '', email: '', phone: '' },
      { id: 4, name: '', email: '', phone: '' },
      { id: 5, name: '', email: '', phone: '' },
    ];
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody > tr'));
    expect(rows.length).toBe(5);
  });
});
