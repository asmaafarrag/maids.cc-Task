import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RepStockComponent } from './rep-stock.component';

describe('RepStockComponent', () => {
  let component: RepStockComponent;
  let fixture: ComponentFixture<RepStockComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RepStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
