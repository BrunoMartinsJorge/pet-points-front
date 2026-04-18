import { TestBed } from '@angular/core/testing';

import { NotificacoesService } from './notificacoes-service';

describe('NotificacoesService', () => {
  let service: NotificacoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificacoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
