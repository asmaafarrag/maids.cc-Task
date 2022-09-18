import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestItemsComponent } from './test-items.component';

describe('TestItemsComponent', () => {
  let component: TestItemsComponent;
  let fixture: ComponentFixture<TestItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
