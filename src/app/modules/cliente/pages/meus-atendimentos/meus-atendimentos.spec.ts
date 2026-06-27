import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusAtendimentos } from './meus-atendimentos';

describe('MeusAtendimentos', () => {
  let component: MeusAtendimentos;
  let fixture: ComponentFixture<MeusAtendimentos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeusAtendimentos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeusAtendimentos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
