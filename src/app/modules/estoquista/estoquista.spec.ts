import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Estoquista } from './estoquista';

describe('Estoquista', () => {
  let component: Estoquista;
  let fixture: ComponentFixture<Estoquista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Estoquista]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Estoquista);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
