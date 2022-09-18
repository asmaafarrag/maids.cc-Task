import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RepSellingDetComponent } from './rep-selling-det.component';

describe('RepSellingDetComponent', () => {
  let component: RepSellingDetComponent;
  let fixture: ComponentFixture<RepSellingDetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RepSellingDetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepSellingDetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
