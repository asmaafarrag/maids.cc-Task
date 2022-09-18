import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppDiscountsComponent } from './supp-discounts.component';

describe('SuppDiscountsComponent', () => {
  let component: SuppDiscountsComponent;
  let fixture: ComponentFixture<SuppDiscountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuppDiscountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppDiscountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
