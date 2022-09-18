import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeItemPriceComponent } from './change-item-price.component';

describe('ChangeItemPriceComponent', () => {
  let component: ChangeItemPriceComponent;
  let fixture: ComponentFixture<ChangeItemPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeItemPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeItemPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
