import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedInvComponent } from './rejected-inv.component';

describe('RejectedInvComponent', () => {
  let component: RejectedInvComponent;
  let fixture: ComponentFixture<RejectedInvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedInvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedInvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
