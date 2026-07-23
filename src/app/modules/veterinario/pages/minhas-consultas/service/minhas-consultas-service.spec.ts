import { TestBed } from '@angular/core/testing';

import { MinhasConsultasService } from './minhas-consultas-service';

describe('MinhasConsultasService', () => {
  let service: MinhasConsultasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinhasConsultasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
