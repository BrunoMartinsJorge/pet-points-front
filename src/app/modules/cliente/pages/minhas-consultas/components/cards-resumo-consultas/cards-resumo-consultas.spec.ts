import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsResumoConsultas } from './cards-resumo-consultas';

describe('CardsResumoConsultas', () => {
  let component: CardsResumoConsultas;
  let fixture: ComponentFixture<CardsResumoConsultas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsResumoConsultas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsResumoConsultas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
