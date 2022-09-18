import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransBetStoresItemsComponent } from './trans-bet-stores-items.component';

describe('TransBetStoresItemsComponent', () => {
  let component: TransBetStoresItemsComponent;
  let fixture: ComponentFixture<TransBetStoresItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransBetStoresItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransBetStoresItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
