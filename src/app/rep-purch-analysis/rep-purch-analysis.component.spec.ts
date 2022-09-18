import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepPurchAnalysisComponent } from './rep-purch-analysis.component';

describe('RepPurchAnalysisComponent', () => {
  let component: RepPurchAnalysisComponent;
  let fixture: ComponentFixture<RepPurchAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepPurchAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepPurchAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
