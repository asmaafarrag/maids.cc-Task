import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsViewComponent } from './adds-view.component';

describe('AddsViewComponent', () => {
  let component: AddsViewComponent;
  let fixture: ComponentFixture<AddsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
