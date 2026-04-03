import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarFuncionario } from './registrar-funcionario';

describe('RegistrarFuncionario', () => {
  let component: RegistrarFuncionario;
  let fixture: ComponentFixture<RegistrarFuncionario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarFuncionario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarFuncionario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
