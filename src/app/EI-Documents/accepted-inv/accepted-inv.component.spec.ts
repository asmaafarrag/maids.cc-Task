import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedInvComponent } from './accepted-inv.component';

describe('AcceptedInvComponent', () => {
  let component: AcceptedInvComponent;
  let fixture: ComponentFixture<AcceptedInvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptedInvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptedInvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
