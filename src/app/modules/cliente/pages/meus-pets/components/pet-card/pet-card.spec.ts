import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetCard } from './pet-card';

describe('PetCard', () => {
  let component: PetCard;
  let fixture: ComponentFixture<PetCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
