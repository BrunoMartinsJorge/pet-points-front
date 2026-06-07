import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Imagem } from './imagem';

describe('Imagem', () => {
  let component: Imagem;
  let fixture: ComponentFixture<Imagem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Imagem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Imagem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
