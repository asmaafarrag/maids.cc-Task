import { ComponentFixture, TestBed } from '@angular/core/testing';

import { I18nLangComponent } from './i18n-lang.component';

describe('I18nLangComponent', () => {
  let component: I18nLangComponent;
  let fixture: ComponentFixture<I18nLangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ I18nLangComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(I18nLangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
