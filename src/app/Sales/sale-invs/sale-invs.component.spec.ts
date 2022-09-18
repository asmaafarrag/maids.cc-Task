import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SaleInvsComponent } from './sale-invs.component';

describe('SaleInvsComponent', () => {
  let component: SaleInvsComponent;
  let fixture: ComponentFixture<SaleInvsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleInvsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleInvsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
