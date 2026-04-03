import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFuncionario } from './card-funcionario';

describe('CardFuncionario', () => {
  let component: CardFuncionario;
  let fixture: ComponentFixture<CardFuncionario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardFuncionario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardFuncionario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
