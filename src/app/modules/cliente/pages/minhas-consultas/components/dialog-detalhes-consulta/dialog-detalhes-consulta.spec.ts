import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDetalhesConsulta } from './dialog-detalhes-consulta';

describe('DialogDetalhesConsulta', () => {
  let component: DialogDetalhesConsulta;
  let fixture: ComponentFixture<DialogDetalhesConsulta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogDetalhesConsulta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDetalhesConsulta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
