import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BagTipoMovimentacao } from './bag-tipo-movimentacao';

describe('BagTipoMovimentacao', () => {
  let component: BagTipoMovimentacao;
  let fixture: ComponentFixture<BagTipoMovimentacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BagTipoMovimentacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BagTipoMovimentacao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
