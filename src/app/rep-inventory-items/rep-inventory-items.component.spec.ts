import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepInventoryItemsComponent } from './rep-inventory-items.component';

describe('RepInventoryItemsComponent', () => {
  let component: RepInventoryItemsComponent;
  let fixture: ComponentFixture<RepInventoryItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepInventoryItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepInventoryItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
