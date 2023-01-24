import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfmakenewversionComponent } from './pdfmakenewversion.component';

describe('PdfmakenewversionComponent', () => {
  let component: PdfmakenewversionComponent;
  let fixture: ComponentFixture<PdfmakenewversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfmakenewversionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfmakenewversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
