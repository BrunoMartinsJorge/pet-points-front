import { TestBed } from '@angular/core/testing';

import { AtendimentosClienteService } from './atendimentos-cliente-service';

describe('AtendimentosClienteService', () => {
  let service: AtendimentosClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtendimentosClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
