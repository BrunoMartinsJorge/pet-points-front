import { TestBed } from '@angular/core/testing';

import { ProdutosEstoqueService } from './produtos-estoque-service';

describe('ProdutosEstoqueService', () => {
  let service: ProdutosEstoqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutosEstoqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
