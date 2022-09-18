import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustDiscountsComponent } from './cust-discounts.component';

describe('CustDiscountsComponent', () => {
  let component: CustDiscountsComponent;
  let fixture: ComponentFixture<CustDiscountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustDiscountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustDiscountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
