import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NavBarHeaderComponent } from './nav-bar-header.component';

describe('NavBarHeaderComponent', () => {
  let component: NavBarHeaderComponent;
  let fixture: ComponentFixture<NavBarHeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NavBarHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
