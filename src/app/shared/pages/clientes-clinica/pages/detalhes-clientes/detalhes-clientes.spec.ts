import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesClientes } from './detalhes-clientes';

describe('DetalhesClientes', () => {
  let component: DetalhesClientes;
  let fixture: ComponentFixture<DetalhesClientes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesClientes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesClientes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
