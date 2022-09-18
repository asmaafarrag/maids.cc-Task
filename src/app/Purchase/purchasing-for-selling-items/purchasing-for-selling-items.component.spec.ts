import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasingForSellingItemsComponent } from './purchasing-for-selling-items.component';

describe('PurchasingForSellingItemsComponent', () => {
  let component: PurchasingForSellingItemsComponent;
  let fixture: ComponentFixture<PurchasingForSellingItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasingForSellingItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasingForSellingItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
