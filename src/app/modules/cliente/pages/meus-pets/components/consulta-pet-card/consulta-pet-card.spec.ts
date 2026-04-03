import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaPetCard } from './consulta-pet-card';

describe('ConsultaPetCard', () => {
  let component: ConsultaPetCard;
  let fixture: ComponentFixture<ConsultaPetCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaPetCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaPetCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
