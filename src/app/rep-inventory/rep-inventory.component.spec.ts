import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepInventoryComponent } from './rep-inventory.component';

describe('RepInventoryComponent', () => {
  let component: RepInventoryComponent;
  let fixture: ComponentFixture<RepInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
