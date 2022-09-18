import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SalesRequestOrderComponent } from './sales-request-order.component';

describe('SalesRequestOrderComponent', () => {
  let component: SalesRequestOrderComponent;
  let fixture: ComponentFixture<SalesRequestOrderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesRequestOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesRequestOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
