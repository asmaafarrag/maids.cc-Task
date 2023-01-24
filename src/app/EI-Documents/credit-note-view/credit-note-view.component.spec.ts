import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditNoteViewComponent } from './credit-note-view.component';

describe('CreditNoteViewComponent', () => {
  let component: CreditNoteViewComponent;
  let fixture: ComponentFixture<CreditNoteViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditNoteViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditNoteViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
