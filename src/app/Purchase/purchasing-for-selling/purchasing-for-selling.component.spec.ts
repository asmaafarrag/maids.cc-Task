import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasingForSellingComponent } from './purchasing-for-selling.component';

describe('PurchasingForSellingComponent', () => {
  let component: PurchasingForSellingComponent;
  let fixture: ComponentFixture<PurchasingForSellingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasingForSellingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasingForSellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
