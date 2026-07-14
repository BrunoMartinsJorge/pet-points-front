import { TestBed } from '@angular/core/testing';

import { DashboardVeterinarioService } from './dashboard-veterinario-service';

describe('DashboardVeterinarioService', () => {
  let service: DashboardVeterinarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardVeterinarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
