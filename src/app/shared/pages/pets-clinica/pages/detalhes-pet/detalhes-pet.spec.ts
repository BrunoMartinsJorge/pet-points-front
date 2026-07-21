import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesPet } from './detalhes-pet';

describe('DetalhesPet', () => {
  let component: DetalhesPet;
  let fixture: ComponentFixture<DetalhesPet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesPet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesPet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
