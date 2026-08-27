import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardResumo } from './card-resumo';

describe('CardResumo', () => {
  let component: CardResumo;
  let fixture: ComponentFixture<CardResumo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardResumo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardResumo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
