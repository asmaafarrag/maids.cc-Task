import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HChartPieComponent } from './h-chart-pie.component';

describe('HChartPieComponent', () => {
  let component: HChartPieComponent;
  let fixture: ComponentFixture<HChartPieComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HChartPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HChartPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
