import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRegistrarConsulta } from './dialog-registrar-consulta';

describe('DialogRegistrarConsulta', () => {
  let component: DialogRegistrarConsulta;
  let fixture: ComponentFixture<DialogRegistrarConsulta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogRegistrarConsulta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogRegistrarConsulta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
