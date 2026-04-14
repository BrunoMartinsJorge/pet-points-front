import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerarNovaMovimentacao } from './gerar-nova-movimentacao';

describe('GerarNovaMovimentacao', () => {
  let component: GerarNovaMovimentacao;
  let fixture: ComponentFixture<GerarNovaMovimentacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerarNovaMovimentacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerarNovaMovimentacao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
