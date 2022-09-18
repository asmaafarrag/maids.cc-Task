import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellingRetsComponent } from './selling-rets.component';

describe('SellingRetsComponent', () => {
  let component: SellingRetsComponent;
  let fixture: ComponentFixture<SellingRetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellingRetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellingRetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
