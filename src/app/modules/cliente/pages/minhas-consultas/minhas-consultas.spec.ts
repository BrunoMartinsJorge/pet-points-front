import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhasConsultas } from './minhas-consultas';

describe('MinhasConsultas', () => {
  let component: MinhasConsultas;
  let fixture: ComponentFixture<MinhasConsultas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinhasConsultas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinhasConsultas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
