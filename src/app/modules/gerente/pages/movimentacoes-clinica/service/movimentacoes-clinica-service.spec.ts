import { TestBed } from '@angular/core/testing';

import { MovimentacoesClinicaService } from './movimentacoes-clinica-service';

describe('MovimentacoesClinicaService', () => {
  let service: MovimentacoesClinicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovimentacoesClinicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
