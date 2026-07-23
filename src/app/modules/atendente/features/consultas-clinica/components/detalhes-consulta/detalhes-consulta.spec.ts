import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesConsulta } from './detalhes-consulta';

describe('DetalhesConsulta', () => {
  let component: DetalhesConsulta;
  let fixture: ComponentFixture<DetalhesConsulta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesConsulta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesConsulta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
