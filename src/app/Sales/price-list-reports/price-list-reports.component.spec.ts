import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceListReportsComponent } from './price-list-reports.component';

describe('PriceListReportsComponent', () => {
  let component: PriceListReportsComponent;
  let fixture: ComponentFixture<PriceListReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceListReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceListReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
