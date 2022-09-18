import { TestBed } from '@angular/core/testing';

import { SuppDiscountService } from './supp-discount.service';

describe('SuppDiscountService', () => {
  let service: SuppDiscountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuppDiscountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
