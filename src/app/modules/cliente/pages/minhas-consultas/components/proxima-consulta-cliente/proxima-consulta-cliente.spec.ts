import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProximaConsultaCliente } from './proxima-consulta-cliente';

describe('ProximaConsultaCliente', () => {
  let component: ProximaConsultaCliente;
  let fixture: ComponentFixture<ProximaConsultaCliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProximaConsultaCliente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProximaConsultaCliente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
