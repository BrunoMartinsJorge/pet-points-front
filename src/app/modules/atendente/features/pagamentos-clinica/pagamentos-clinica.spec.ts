import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagamentosClinica } from './pagamentos-clinica';

describe('PagamentosClinica', () => {
  let component: PagamentosClinica;
  let fixture: ComponentFixture<PagamentosClinica>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagamentosClinica]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagamentosClinica);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
