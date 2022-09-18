import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EmpPermitsComponent } from './emp-permits.component';

describe('EmpPermitsComponent', () => {
  let component: EmpPermitsComponent;
  let fixture: ComponentFixture<EmpPermitsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpPermitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpPermitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
