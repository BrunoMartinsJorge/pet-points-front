import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusPagamentos } from './meus-pagamentos';

describe('MeusPagamentos', () => {
  let component: MeusPagamentos;
  let fixture: ComponentFixture<MeusPagamentos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeusPagamentos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeusPagamentos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
