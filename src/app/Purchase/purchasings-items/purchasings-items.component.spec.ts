import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasingsItemsComponent } from './purchasings-items.component';

describe('PurchasingsItemsComponent', () => {
  let component: PurchasingsItemsComponent;
  let fixture: ComponentFixture<PurchasingsItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasingsItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasingsItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
