import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvsOutViewComponent } from './invs-out-view.component';

describe('InvsOutViewComponent', () => {
  let component: InvsOutViewComponent;
  let fixture: ComponentFixture<InvsOutViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvsOutViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvsOutViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
