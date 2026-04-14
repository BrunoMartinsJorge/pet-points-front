import { TestBed } from '@angular/core/testing';

import { ClienteDashboardService } from './cliente-dashboard-service';

describe('ClienteDashboardService', () => {
  let service: ClienteDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienteDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
