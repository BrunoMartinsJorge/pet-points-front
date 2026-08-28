import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BagFormaPagamento } from './bag-forma-pagamento';

describe('BagFormaPagamento', () => {
  let component: BagFormaPagamento;
  let fixture: ComponentFixture<BagFormaPagamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BagFormaPagamento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BagFormaPagamento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
