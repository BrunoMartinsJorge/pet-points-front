import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimentacoesClinica } from './movimentacoes-clinica';

describe('MovimentacoesClinica', () => {
  let component: MovimentacoesClinica;
  let fixture: ComponentFixture<MovimentacoesClinica>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovimentacoesClinica]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovimentacoesClinica);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
