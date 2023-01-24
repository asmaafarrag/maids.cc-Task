import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsubmitteSellingsRetComponent } from './unsubmitte-sellings-ret.component';

describe('UnsubmitteSellingsRetComponent', () => {
  let component: UnsubmitteSellingsRetComponent;
  let fixture: ComponentFixture<UnsubmitteSellingsRetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnsubmitteSellingsRetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsubmitteSellingsRetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
