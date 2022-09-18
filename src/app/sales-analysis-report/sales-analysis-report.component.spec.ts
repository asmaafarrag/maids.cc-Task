import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesAnalysisReportComponent } from './sales-analysis-report.component';

describe('SalesAnalysisReportComponent', () => {
  let component: SalesAnalysisReportComponent;
  let fixture: ComponentFixture<SalesAnalysisReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesAnalysisReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesAnalysisReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
