import { TestBed } from '@angular/core/testing';

import { CustDiscountService } from './cust-discount.service';

describe('CustDiscountService', () => {
  let service: CustDiscountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustDiscountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
