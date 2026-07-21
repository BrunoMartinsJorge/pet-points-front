import { TestBed } from '@angular/core/testing';

import { PetsClinicaService } from './pets-clinica-service';

describe('PetsClinicaService', () => {
  let service: PetsClinicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetsClinicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
