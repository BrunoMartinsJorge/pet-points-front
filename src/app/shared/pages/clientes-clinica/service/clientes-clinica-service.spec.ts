import { TestBed } from '@angular/core/testing';

import { ClientesClinicaService } from './clientes-clinica-service';

describe('ClientesClinicaService', () => {
  let service: ClientesClinicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientesClinicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
