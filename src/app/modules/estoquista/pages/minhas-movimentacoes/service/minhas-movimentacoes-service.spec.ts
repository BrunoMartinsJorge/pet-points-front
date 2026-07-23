import { TestBed } from '@angular/core/testing';

import { MinhasMovimentacoesService } from './minhas-movimentacoes-service';

describe('MinhasMovimentacoesService', () => {
  let service: MinhasMovimentacoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinhasMovimentacoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
