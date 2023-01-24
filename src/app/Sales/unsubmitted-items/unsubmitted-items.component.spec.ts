import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsubmittedItemsComponent } from './unsubmitted-items.component';

describe('UnsubmittedItemsComponent', () => {
  let component: UnsubmittedItemsComponent;
  let fixture: ComponentFixture<UnsubmittedItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnsubmittedItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsubmittedItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
