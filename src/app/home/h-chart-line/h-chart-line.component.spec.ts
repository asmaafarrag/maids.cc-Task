import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HChartLineComponent } from './h-chart-line.component';

describe('HChartLineComponent', () => {
  let component: HChartLineComponent;
  let fixture: ComponentFixture<HChartLineComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HChartLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HChartLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
