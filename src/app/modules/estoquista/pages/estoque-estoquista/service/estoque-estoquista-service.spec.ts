import { TestBed } from '@angular/core/testing';

import { EstoqueEstoquistaService } from './estoque-estoquista-service';

describe('EstoqueEstoquistaService', () => {
  let service: EstoqueEstoquistaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstoqueEstoquistaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
