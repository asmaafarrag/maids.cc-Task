import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RepIncomeStatmentComponent } from './rep-income-statment.component';

describe('RepIncomeStatmentComponent', () => {
  let component: RepIncomeStatmentComponent;
  let fixture: ComponentFixture<RepIncomeStatmentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RepIncomeStatmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepIncomeStatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
