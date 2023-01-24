import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceExcelComponent } from './invoice-excel.component';

describe('InvoiceExcelComponent', () => {
  let component: InvoiceExcelComponent;
  let fixture: ComponentFixture<InvoiceExcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceExcelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
