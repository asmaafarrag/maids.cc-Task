import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentByTypeComponent } from './document-by-type.component';

describe('DocumentByTypeComponent', () => {
  let component: DocumentByTypeComponent;
  let fixture: ComponentFixture<DocumentByTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentByTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentByTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
