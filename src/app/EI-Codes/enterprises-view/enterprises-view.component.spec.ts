import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterprisesViewComponent } from './enterprises-view.component';

describe('EnterprisesViewComponent', () => {
  let component: EnterprisesViewComponent;
  let fixture: ComponentFixture<EnterprisesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterprisesViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterprisesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
