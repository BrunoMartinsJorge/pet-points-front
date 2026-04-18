import { TestBed } from '@angular/core/testing';

import { NotificacoesWsService } from './notificacoes-ws-service';

describe('NotificacoesWsService', () => {
  let service: NotificacoesWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificacoesWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
