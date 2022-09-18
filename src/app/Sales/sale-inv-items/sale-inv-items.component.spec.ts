import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SaleInvItemsComponent } from './sale-inv-items.component';

describe('SaleInvItemsComponent', () => {
  let component: SaleInvItemsComponent;
  let fixture: ComponentFixture<SaleInvItemsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleInvItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleInvItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
