import { TestBed } from '@angular/core/testing';

import { ETAService } from './eta.service';

describe('ETAService', () => {
  let service: ETAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ETAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
