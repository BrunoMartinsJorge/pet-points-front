import { TestBed } from '@angular/core/testing';

import { PagamentoClinicaService } from './pagamento-clinica-service';

describe('PagamentoClinicaService', () => {
  let service: PagamentoClinicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagamentoClinicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
