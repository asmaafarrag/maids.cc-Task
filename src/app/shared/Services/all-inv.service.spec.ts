import { TestBed } from '@angular/core/testing';

import { AllInvService } from './all-inv.service';

describe('AllInvService', () => {
  let service: AllInvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllInvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
