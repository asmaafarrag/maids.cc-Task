import { TestBed } from '@angular/core/testing';

import { AllInvoiceService } from './all-invoice.service';

describe('AllInvoiceService', () => {
  let service: AllInvoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllInvoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
