import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EmpPermitComponent } from './emp-permit.component';

describe('EmpPermitComponent', () => {
  let component: EmpPermitComponent;
  let fixture: ComponentFixture<EmpPermitComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpPermitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpPermitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
