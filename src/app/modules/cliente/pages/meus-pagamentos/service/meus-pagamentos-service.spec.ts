import { TestBed } from '@angular/core/testing';

import { MeusPagamentosService } from './meus-pagamentos-service';

describe('MeusPagamentosService', () => {
  let service: MeusPagamentosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeusPagamentosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
