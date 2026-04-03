import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacoesPet } from './informacoes-pet';

describe('InformacoesPet', () => {
  let component: InformacoesPet;
  let fixture: ComponentFixture<InformacoesPet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformacoesPet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformacoesPet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
