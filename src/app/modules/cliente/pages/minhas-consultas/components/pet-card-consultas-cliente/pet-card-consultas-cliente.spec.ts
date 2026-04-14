import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetCardConsultasCliente } from './pet-card-consultas-cliente';

describe('PetCardConsultasCliente', () => {
  let component: PetCardConsultasCliente;
  let fixture: ComponentFixture<PetCardConsultasCliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetCardConsultasCliente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetCardConsultasCliente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
