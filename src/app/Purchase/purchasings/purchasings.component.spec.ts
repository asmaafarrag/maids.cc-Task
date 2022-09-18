import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasingsComponent } from './purchasings.component';

describe('PurchasingsComponent', () => {
  let component: PurchasingsComponent;
  let fixture: ComponentFixture<PurchasingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
