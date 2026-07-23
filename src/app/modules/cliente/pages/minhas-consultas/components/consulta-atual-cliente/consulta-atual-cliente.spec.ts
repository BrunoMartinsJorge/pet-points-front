import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaAtualCliente } from './consulta-atual-cliente';

describe('ConsultaAtualCliente', () => {
  let component: ConsultaAtualCliente;
  let fixture: ComponentFixture<ConsultaAtualCliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaAtualCliente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaAtualCliente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
