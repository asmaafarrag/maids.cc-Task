import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRetsViewComponent } from './add-rets-view.component';

describe('AddRetsViewComponent', () => {
  let component: AddRetsViewComponent;
  let fixture: ComponentFixture<AddRetsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRetsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRetsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
