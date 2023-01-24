import { TestBed } from '@angular/core/testing';

import { RegionCitiesService } from './region-cities.service';

describe('RegionCitiesService', () => {
  let service: RegionCitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegionCitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
