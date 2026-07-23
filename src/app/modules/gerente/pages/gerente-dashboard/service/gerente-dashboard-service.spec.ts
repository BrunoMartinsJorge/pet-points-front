import { TestBed } from '@angular/core/testing';

import { GerenteDashboardService } from './gerente-dashboard-service';

describe('GerenteDashboardService', () => {
  let service: GerenteDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GerenteDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
