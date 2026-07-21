import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesClinica } from './clientes-clinica';

describe('ClientesClinica', () => {
  let component: ClientesClinica;
  let fixture: ComponentFixture<ClientesClinica>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesClinica]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesClinica);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
