import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RepAccStatementComponent } from './rep-acc-statement.component';

describe('RepAccStatementComponent', () => {
  let component: RepAccStatementComponent;
  let fixture: ComponentFixture<RepAccStatementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RepAccStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepAccStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
