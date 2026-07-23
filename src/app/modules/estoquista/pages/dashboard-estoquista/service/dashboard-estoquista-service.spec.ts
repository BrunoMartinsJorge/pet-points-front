import { TestBed } from '@angular/core/testing';

import { DashboardEstoquistaService } from './dashboard-estoquista-service';

describe('DashboardEstoquistaService', () => {
  let service: DashboardEstoquistaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardEstoquistaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
