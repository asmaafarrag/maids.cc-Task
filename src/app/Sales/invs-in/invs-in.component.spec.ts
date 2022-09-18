import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvsInComponent } from './invs-in.component';

describe('InvsInComponent', () => {
  let component: InvsInComponent;
  let fixture: ComponentFixture<InvsInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvsInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvsInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
