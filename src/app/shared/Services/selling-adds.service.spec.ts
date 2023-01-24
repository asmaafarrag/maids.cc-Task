import { TestBed } from '@angular/core/testing';

import { SellingAddsService } from './selling-adds.service';

describe('SellingAddsService', () => {
  let service: SellingAddsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellingAddsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
