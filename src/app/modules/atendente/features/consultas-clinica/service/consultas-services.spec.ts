import { TestBed } from '@angular/core/testing';

import { ConsultasServices } from './consultas-services';

describe('ConsultasServices', () => {
  let service: ConsultasServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultasServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
