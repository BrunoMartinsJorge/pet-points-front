import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesPagamento } from './detalhes-pagamento';

describe('DetalhesPagamento', () => {
  let component: DetalhesPagamento;
  let fixture: ComponentFixture<DetalhesPagamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesPagamento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesPagamento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
