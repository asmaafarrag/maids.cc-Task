import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustDiscountsViewComponent } from './cust-discounts-view.component';

describe('CustDiscountsViewComponent', () => {
  let component: CustDiscountsViewComponent;
  let fixture: ComponentFixture<CustDiscountsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustDiscountsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustDiscountsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
