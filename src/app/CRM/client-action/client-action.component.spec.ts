import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClientActionComponent } from './client-action.component';

describe('ClientActionComponent', () => {
  let component: ClientActionComponent;
  let fixture: ComponentFixture<ClientActionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
