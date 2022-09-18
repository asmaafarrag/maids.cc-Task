import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VacOrderApproveComponent } from './vac-order-approve.component';

describe('VacOrderApproveComponent', () => {
  let component: VacOrderApproveComponent;
  let fixture: ComponentFixture<VacOrderApproveComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VacOrderApproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacOrderApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
