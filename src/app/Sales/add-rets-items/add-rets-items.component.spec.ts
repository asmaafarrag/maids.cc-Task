import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRetsItemsComponent } from './add-rets-items.component';

describe('AddRetsItemsComponent', () => {
  let component: AddRetsItemsComponent;
  let fixture: ComponentFixture<AddRetsItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRetsItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRetsItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
