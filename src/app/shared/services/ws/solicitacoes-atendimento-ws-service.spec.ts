import { TestBed } from '@angular/core/testing';

import { SolicitacoesAtendimentoWsService } from './solicitacoes-atendimento-ws-service';

describe('SolicitacoesAtendimentoWsService', () => {
  let service: SolicitacoesAtendimentoWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitacoesAtendimentoWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
