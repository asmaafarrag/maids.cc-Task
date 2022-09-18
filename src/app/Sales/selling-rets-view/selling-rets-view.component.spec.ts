import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellingRetsViewComponent } from './selling-rets-view.component';

describe('SellingRetsViewComponent', () => {
  let component: SellingRetsViewComponent;
  let fixture: ComponentFixture<SellingRetsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellingRetsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellingRetsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
