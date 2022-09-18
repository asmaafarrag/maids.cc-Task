import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsItemsComponent } from './adds-items.component';

describe('AddsItemsComponent', () => {
  let component: AddsItemsComponent;
  let fixture: ComponentFixture<AddsItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddsItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
