import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvsOutComponent } from './invs-out.component';

describe('InvsOutComponent', () => {
  let component: InvsOutComponent;
  let fixture: ComponentFixture<InvsOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvsOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvsOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
