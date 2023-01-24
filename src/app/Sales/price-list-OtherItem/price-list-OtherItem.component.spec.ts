import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceListItemComponent } from './price-list-item.component';

describe('PriceListItemComponent', () => {
  let component: PriceListItemComponent;
  let fixture: ComponentFixture<PriceListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
