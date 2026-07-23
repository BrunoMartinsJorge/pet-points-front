import { TestBed } from '@angular/core/testing';

import { AtendimentosAtendenteeService } from './atendimentos-atendentee-service';

describe('AtendimentosAtendenteeService', () => {
  let service: AtendimentosAtendenteeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtendimentosAtendenteeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
