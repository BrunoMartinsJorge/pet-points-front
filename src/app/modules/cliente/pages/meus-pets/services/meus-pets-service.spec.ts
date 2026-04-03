import { TestBed } from '@angular/core/testing';

import { MeusPetsService } from './meus-pets-service';

describe('MeusPetsService', () => {
  let service: MeusPetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeusPetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
