import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RepEmpVacComponent } from './rep-emp-vac.component';

describe('RepEmpVacComponent', () => {
  let component: RepEmpVacComponent;
  let fixture: ComponentFixture<RepEmpVacComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RepEmpVacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepEmpVacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
