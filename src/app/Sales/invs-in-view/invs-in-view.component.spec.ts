import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvsInViewComponent } from './invs-in-view.component';

describe('InvsInViewComponent', () => {
  let component: InvsInViewComponent;
  let fixture: ComponentFixture<InvsInViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvsInViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvsInViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
