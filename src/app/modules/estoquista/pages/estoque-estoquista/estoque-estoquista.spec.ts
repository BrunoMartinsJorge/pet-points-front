import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstoqueEstoquista } from './estoque-estoquista';

describe('EstoqueEstoquista', () => {
  let component: EstoqueEstoquista;
  let fixture: ComponentFixture<EstoqueEstoquista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstoqueEstoquista]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstoqueEstoquista);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
