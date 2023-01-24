import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusForSellingsComponent } from './status-for-sellings.component';

describe('StatusForSellingsComponent', () => {
  let component: StatusForSellingsComponent;
  let fixture: ComponentFixture<StatusForSellingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusForSellingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusForSellingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
