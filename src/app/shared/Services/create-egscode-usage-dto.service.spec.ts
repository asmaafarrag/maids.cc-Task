import { TestBed } from '@angular/core/testing';

import { CreateEGSCodeUsageDTOService } from './create-egscode-usage-dto.service';

describe('CreateEGSCodeUsageDTOService', () => {
  let service: CreateEGSCodeUsageDTOService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateEGSCodeUsageDTOService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
