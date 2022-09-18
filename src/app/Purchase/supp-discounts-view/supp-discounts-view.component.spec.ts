import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppDiscountsViewComponent } from './supp-discounts-view.component';

describe('SuppDiscountsViewComponent', () => {
  let component: SuppDiscountsViewComponent;
  let fixture: ComponentFixture<SuppDiscountsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuppDiscountsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppDiscountsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
