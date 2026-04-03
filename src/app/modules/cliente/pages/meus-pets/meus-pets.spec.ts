import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusPets } from './meus-pets';

describe('MeusPets', () => {
  let component: MeusPets;
  let fixture: ComponentFixture<MeusPets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeusPets]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeusPets);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
