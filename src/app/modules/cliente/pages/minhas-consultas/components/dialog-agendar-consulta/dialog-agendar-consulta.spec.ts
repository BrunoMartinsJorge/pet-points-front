import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAgendarConsulta } from './dialog-agendar-consulta';

describe('DialogAgendarConsulta', () => {
  let component: DialogAgendarConsulta;
  let fixture: ComponentFixture<DialogAgendarConsulta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAgendarConsulta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAgendarConsulta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
