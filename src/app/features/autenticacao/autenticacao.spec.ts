import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Autenticacao } from './autenticacao';

describe('Autenticacao', () => {
  let component: Autenticacao;
  let fixture: ComponentFixture<Autenticacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Autenticacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Autenticacao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
