import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardConsultasCliente } from './card-consultas-cliente';

describe('CardConsultasCliente', () => {
  let component: CardConsultasCliente;
  let fixture: ComponentFixture<CardConsultasCliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardConsultasCliente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardConsultasCliente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
