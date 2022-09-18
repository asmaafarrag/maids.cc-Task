import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransBetStoresViewComponent } from './trans-bet-stores-view.component';

describe('TransBetStoresViewComponent', () => {
  let component: TransBetStoresViewComponent;
  let fixture: ComponentFixture<TransBetStoresViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransBetStoresViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransBetStoresViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
