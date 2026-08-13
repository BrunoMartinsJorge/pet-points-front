import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReagendarConsulta } from './reagendar-consulta';

describe('ReagendarConsulta', () => {
  let component: ReagendarConsulta;
  let fixture: ComponentFixture<ReagendarConsulta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReagendarConsulta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReagendarConsulta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
