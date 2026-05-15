import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesFuncionario } from './detalhes-funcionario';

describe('DetalhesFuncionario', () => {
  let component: DetalhesFuncionario;
  let fixture: ComponentFixture<DetalhesFuncionario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesFuncionario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesFuncionario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
