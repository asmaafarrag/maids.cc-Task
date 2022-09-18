import { TestBed } from '@angular/core/testing';

import { SellingRetService } from './selling-ret.service';

describe('SellingRetService', () => {
  let service: SellingRetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellingRetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
