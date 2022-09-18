import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HChartBarComponent } from './h-chart-bar.component';

describe('HChartBarComponent', () => {
  let component: HChartBarComponent;
  let fixture: ComponentFixture<HChartBarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HChartBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HChartBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
