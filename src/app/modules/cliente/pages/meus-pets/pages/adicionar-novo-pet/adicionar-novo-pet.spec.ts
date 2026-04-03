import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarNovoPet } from './adicionar-novo-pet';

describe('AdicionarNovoPet', () => {
  let component: AdicionarNovoPet;
  let fixture: ComponentFixture<AdicionarNovoPet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarNovoPet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdicionarNovoPet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
