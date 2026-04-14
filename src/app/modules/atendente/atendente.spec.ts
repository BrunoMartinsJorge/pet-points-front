import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Atendente } from './atendente';

describe('Atendente', () => {
  let component: Atendente;
  let fixture: ComponentFixture<Atendente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Atendente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Atendente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
