import { TestBed } from '@angular/core/testing';

import { AutenticaoService } from './autenticao-service';

describe('AutenticaoService', () => {
  let service: AutenticaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutenticaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
