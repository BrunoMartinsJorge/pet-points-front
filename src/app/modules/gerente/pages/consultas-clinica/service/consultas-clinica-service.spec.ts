import { TestBed } from '@angular/core/testing';

import { ConsultasClinicaService } from './consultas-clinica-service';

describe('ConsultasClinicaService', () => {
  let service: ConsultasClinicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultasClinicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
