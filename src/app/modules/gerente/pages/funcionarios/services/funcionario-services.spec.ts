import { TestBed } from '@angular/core/testing';

import { FuncionarioServices } from './funcionario-services';

describe('FuncionarioServices', () => {
  let service: FuncionarioServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuncionarioServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
