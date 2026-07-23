import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendimentoSelecionado } from './atendimento-selecionado';

describe('AtendimentoSelecionado', () => {
  let component: AtendimentoSelecionado;
  let fixture: ComponentFixture<AtendimentoSelecionado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtendimentoSelecionado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtendimentoSelecionado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
