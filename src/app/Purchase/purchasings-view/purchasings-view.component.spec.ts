import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasingsViewComponent } from './purchasings-view.component';

describe('PurchasingsViewComponent', () => {
  let component: PurchasingsViewComponent;
  let fixture: ComponentFixture<PurchasingsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasingsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasingsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
