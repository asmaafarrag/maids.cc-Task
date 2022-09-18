import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransBetStoresComponent } from './trans-bet-stores.component';

describe('TransBetStoresComponent', () => {
  let component: TransBetStoresComponent;
  let fixture: ComponentFixture<TransBetStoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransBetStoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransBetStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
