import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitSubComponent } from './wait-sub.component';

describe('WaitSubComponent', () => {
  let component: WaitSubComponent;
  let fixture: ComponentFixture<WaitSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitSubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
