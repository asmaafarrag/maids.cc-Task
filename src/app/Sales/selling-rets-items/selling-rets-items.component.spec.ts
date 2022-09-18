import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellingRetsItemsComponent } from './selling-rets-items.component';

describe('SellingRetsItemsComponent', () => {
  let component: SellingRetsItemsComponent;
  let fixture: ComponentFixture<SellingRetsItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellingRetsItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellingRetsItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
