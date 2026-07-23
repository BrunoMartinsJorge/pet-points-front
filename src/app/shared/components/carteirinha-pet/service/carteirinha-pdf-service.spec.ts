import { TestBed } from '@angular/core/testing';

import { CarteirinhaPdfService } from './carteirinha-pdf-service';

describe('CarteirinhaPdfService', () => {
  let service: CarteirinhaPdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarteirinhaPdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
