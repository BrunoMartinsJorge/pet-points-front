import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosEstoque } from './produtos-estoque';

describe('ProdutosEstoque', () => {
  let component: ProdutosEstoque;
  let fixture: ComponentFixture<ProdutosEstoque>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutosEstoque]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutosEstoque);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
