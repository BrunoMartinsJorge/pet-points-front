import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultasClinica } from './consultas-clinica';

describe('ConsultasClinica', () => {
  let component: ConsultasClinica;
  let fixture: ComponentFixture<ConsultasClinica>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultasClinica]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultasClinica);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
