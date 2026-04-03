import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarSenha } from './alterar-senha';

describe('AlterarSenha', () => {
  let component: AlterarSenha;
  let fixture: ComponentFixture<AlterarSenha>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlterarSenha]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlterarSenha);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
