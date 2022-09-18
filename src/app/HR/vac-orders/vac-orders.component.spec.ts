import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VacOrdersComponent } from './vac-orders.component';

describe('VacOrdersComponent', () => {
  let component: VacOrdersComponent;
  let fixture: ComponentFixture<VacOrdersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VacOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
