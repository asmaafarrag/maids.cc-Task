import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeClientsComponent } from './change-clients.component';

describe('ChangeClientsComponent', () => {
  let component: ChangeClientsComponent;
  let fixture: ComponentFixture<ChangeClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeClientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
