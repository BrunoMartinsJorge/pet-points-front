import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsInformacao } from './cards-informacao';

describe('CardsInformacao', () => {
  let component: CardsInformacao;
  let fixture: ComponentFixture<CardsInformacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsInformacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsInformacao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
