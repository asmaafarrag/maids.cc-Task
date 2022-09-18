import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleInvViewComponent } from './sale-inv-view.component';

describe('SaleInvViewComponent', () => {
  let component: SaleInvViewComponent;
  let fixture: ComponentFixture<SaleInvViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleInvViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleInvViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
