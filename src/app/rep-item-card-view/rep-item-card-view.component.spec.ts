import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepItemCardViewComponent } from './rep-item-card-view.component';

describe('RepItemCardViewComponent', () => {
  let component: RepItemCardViewComponent;
  let fixture: ComponentFixture<RepItemCardViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepItemCardViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepItemCardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
