import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCancelarConsulta } from './dialog-cancelar-consulta';

describe('DialogCancelarConsulta', () => {
  let component: DialogCancelarConsulta;
  let fixture: ComponentFixture<DialogCancelarConsulta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCancelarConsulta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCancelarConsulta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
