import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhasMovimentacoes } from './minhas-movimentacoes';

describe('MinhasMovimentacoes', () => {
  let component: MinhasMovimentacoes;
  let fixture: ComponentFixture<MinhasMovimentacoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinhasMovimentacoes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinhasMovimentacoes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
