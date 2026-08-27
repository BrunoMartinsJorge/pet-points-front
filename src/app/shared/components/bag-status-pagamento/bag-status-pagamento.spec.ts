import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BagStatusPagamento } from './bag-status-pagamento';

describe('BagStatusPagamento', () => {
  let component: BagStatusPagamento;
  let fixture: ComponentFixture<BagStatusPagamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BagStatusPagamento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BagStatusPagamento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
