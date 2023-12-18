import { TestBed } from '@angular/core/testing';

import { StatisticsShipperService } from './statistics-shipper.service';

describe('StatisticsShipperService', () => {
  let service: StatisticsShipperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatisticsShipperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
