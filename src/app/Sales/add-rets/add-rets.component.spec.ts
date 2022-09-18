import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRetsComponent } from './add-rets.component';

describe('AddRetsComponent', () => {
  let component: AddRetsComponent;
  let fixture: ComponentFixture<AddRetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
